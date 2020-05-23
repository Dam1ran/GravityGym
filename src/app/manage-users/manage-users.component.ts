import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PaginatedResult } from '../classes/PageModels/PaginatedResult';
import { TableColumn } from '../classes/PageModels/TableColumn';
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { PaginatedRequest } from '../classes/PageModels/PaginatedRequest';
import { RequestFilters } from '../classes/PageModels/RequestFilters';
import { FilterLogicalOperators } from '../classes/PageModels/FilterLogicalOperators';
import { merge } from 'rxjs';
import { Filter } from '../classes/PageModels/Filter';
import { ApplicationUserDTO } from '../classes/ApplicationUserDTO';
import { EditApplicationUserDialogComponent } from '../manage-users/edit-application-user-dialog/edit-application-user-dialog.component';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;
  isLoading=true;
  pagedApplicationUsers: PaginatedResult<ApplicationUserDTO>;
  tableColumns: TableColumn[] = [    
    { name: 'fullName', index: 'fullName', displayName: 'Full Name', useInSearch: true },
    { name: 'email', index: 'email', displayName: 'Email', useInSearch: true },
    { name: 'coachFullName', index: 'coachFullName', displayName: 'Coach Full Name' },
    { name: 'userRoleId', index: 'userRoleId', displayName: 'Role' },
    { name: 'actions', index: 'actions', displayName: 'Actions' }
  ];
  displayedColumns: string[];

  requestFilters: RequestFilters;
  
  searchInput = new FormControl('');
  filterForm: FormGroup;
  panelOpenState = false;

  constructor
  (    
    private adminService: AdminService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,

  )
  {
    this.displayedColumns = this.tableColumns.map(column => column.name);
    this.filterForm = this.formBuilder.group({
      fullName: [''],
      coachFullName: [''],
      email: ['']
    });
  }


  ngAfterViewInit() {
    this.LoadApplicationUsers();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.LoadApplicationUsers();
    });

  }

  LoadApplicationUsers(){
    this.isLoading=true;
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters);
    this.adminService.GetUsers(paginatedRequest)
    .subscribe(
      res=>{
        this.pagedApplicationUsers = res;
        this.isLoading=false;        
      },
      err=>{console.log(err);}
    );
  }

  refresh() {
    this.requestFilters = {filters: [], logicalOperator: FilterLogicalOperators.And};
    this.panelOpenState = false;
    this.filterForm.reset();
    this.LoadApplicationUsers();
  }

  applySearch() {
    this.createFiltersFromSearchInput();
    this.panelOpenState = false;
    this.LoadApplicationUsers();
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


  editApplicationUserDialog(id: number): void {
    const dialogRef = this.dialog.open(EditApplicationUserDialogComponent, {
      width: '320px',
      data: this.pagedApplicationUsers.items.find(x=>x.id==id),
      panelClass: 'custom-modalbox',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => this.LoadApplicationUsers());
  }

  filterExerciseTemplates() {
    this.panelOpenState = false;
    this.createFiltersFromForm();
    this.LoadApplicationUsers();
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
