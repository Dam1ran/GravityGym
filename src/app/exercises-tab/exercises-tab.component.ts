import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PaginatedResult } from '../classes/PageModels/PaginatedResult';
import { ExerciseTemplateDTO } from '../classes/ExerciseTemplateDTO';
import { TableColumn } from '../classes/PageModels/TableColumn';
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { PaginatedRequest } from '../classes/PageModels/PaginatedRequest';
import { RequestFilters } from '../classes/PageModels/RequestFilters';
import { FilterLogicalOperators } from '../classes/PageModels/FilterLogicalOperators';
import { merge } from 'rxjs';
import { Filter } from '../classes/PageModels/Filter';
import { ExerciseTemplateDialogComponent } from '../exercises-tab/exercise-template-dialog/exercise-template-dialog.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { ExerciseTemplateService } from '../Services/exercise-template.service';

@Component({
  selector: 'app-exercises-tab',
  templateUrl: './exercises-tab.component.html',
  styleUrls: ['./exercises-tab.component.scss']
})
export class ExercisesTabComponent implements AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;
  isLoading=true;
  pagedExerciseTemplates: PaginatedResult<ExerciseTemplateDTO>;
  tableColumns: TableColumn[] = [
    { name: 'name', index: 'name', displayName: 'Name', useInSearch: true },
    { name: 'comments', index: 'comments', displayName: 'Comments', useInSearch: true },
    { name: 'tempo', index: 'tempo', displayName: 'Tempo' },
    { name: 'primaryMuscle', index: 'primaryMuscle', displayName: 'Primary Muscle' },
    { name: 'secondaryMuscle', index: 'secondaryMuscle', displayName: 'Secondary Muscle' },
    { name: 'actions', index: 'actions', displayName: 'Actions' }
  ];
  displayedColumns: string[];

  requestFilters: RequestFilters;
  
  searchInput = new FormControl('');
  filterForm: FormGroup;
  panelOpenState = false;

  constructor(    
    private exerciseTemplateService: ExerciseTemplateService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder)
  {
    this.displayedColumns = this.tableColumns.map(column => column.name);
    this.filterForm = this.formBuilder.group({
      name: [''],
      comments: [''],
      primaryMuscle: [''],
      secondaryMuscle: ['']
    });
  }


  ngAfterViewInit() {
    this.LoadExercises();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.LoadExercises();
    });

  }

  LoadExercises(){
    this.isLoading=true;
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters);
    this.exerciseTemplateService.GetExerciseTemplates(paginatedRequest)
    .subscribe(
      res=>{
        this.pagedExerciseTemplates = res;
        this.isLoading=false;        
      },
      err=>{console.log(err);}
    );
  }

  refresh() {
    this.requestFilters = {filters: [], logicalOperator: FilterLogicalOperators.And};
    this.panelOpenState = false;
    this.filterForm.reset();
    this.LoadExercises();
  }

  applySearch() {
    this.createFiltersFromSearchInput();
    this.panelOpenState = false;
    this.LoadExercises();
  }
  
  private createFiltersFromSearchInput() {
    const filterValue = this.searchInput.value.trim();
    if (filterValue) {
      const filters: Filter[] = [];
      this.tableColumns.forEach(column => {
        if (column.useInSearch) {
          const filter: Filter = { path : column.index, value : filterValue };
          filters.push(filter);
        }
      });
      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.Or,
        filters
      };
    } else {
      this.refresh();
    }
  }


  editExerciseTemplateDialog(id: number): void {
    const dialogRef = this.dialog.open(ExerciseTemplateDialogComponent, {
      width: '320px',
      data: this.pagedExerciseTemplates.items.find(x=>x.id==id),
      panelClass: 'custom-modalbox',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => result? this.LoadExercises() : null);
  }

  AddExerciseTemplate(): void {
    const dialogRef = this.dialog.open(ExerciseTemplateDialogComponent, {
      width: '320px',
      data: new ExerciseTemplateDTO(),
      panelClass: 'custom-modalbox',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==true) {
        this.LoadExercises();
      }
    });
  }

  deleteExerciseTemplateDialog(id: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Confirm the deletion?",
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.RemoveExerciseTemplate(id);
      }
    });
  }

  RemoveExerciseTemplate(id: number){
    this.exerciseTemplateService.DeleteExerciseTemplate(id)
    .subscribe(
      res=>{
        if(res.deleted){
          this.LoadExercises();

        }
      }
    );
  }

  filterExerciseTemplates() {
    this.panelOpenState = false;
    this.createFiltersFromForm();
    this.LoadExercises();
  }

  private createFiltersFromForm() {
    if (this.filterForm.value) {
      const filters: Filter[] = [];

      Object.keys(this.filterForm.controls).forEach(key => {
        const controlValue = this.filterForm.controls[key].value;
        if (controlValue) {
          const foundTableColumn = this.tableColumns.find(tableColumn => tableColumn.name === key);
          const filter: Filter = { path : foundTableColumn.index, value : controlValue };
          filters.push(filter);
        }
      });

      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.And,
        filters
      };
    }
  }

}
