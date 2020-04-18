import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { CabinetService } from '../Services/cabinet.service';
import { ExerciseTemplateDTO } from '../classes/ExerciseTemplateDTO';
import { GetExerciseTemplateRequest } from '../classes/GetExerciseTemplateRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MuscleDTO } from '../classes/MuscleDTO';

@Component({
  selector: 'app-exercises-tab',
  templateUrl: './exercises-tab.component.html',
  styleUrls: ['./exercises-tab.component.scss']
})
export class ExercisesTabComponent implements OnInit {


  public searchField : FormGroup; 
  public AddExerciseTemplateForm : FormGroup; 


  private exerciseTemplateDTOs: ExerciseTemplateDTO[];  
  private musclesDTOs: MuscleDTO[];  
  
  public pageSize = 10;
  public currentPage = 1;
  public totalSize = 0;
  pageEvent: PageEvent;
  
  getExerciseTemplateRequest = new GetExerciseTemplateRequest('',1,this.pageSize);

  
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;

  public dataSource; 
  displayedColumns: string[] = ['name', 'Comments', 'Tempo', 'PrimaryMuscleId', 'SecondaryMuscleId', 'Action'];

  constructor(
    private cabinetService: CabinetService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchField = this.fb.group({      
      search:    ['']      
    });

    this.AddExerciseTemplateForm = this.fb.group({      
      name:    [null,[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      comments: [null,[Validators.maxLength(200)]],
      tempo: [null,[Validators.maxLength(10)]],
      primaryMuscleId: [0],
      secondaryMuscleId: [0]
    });


    this.cabinetService.GetMusclesList()
    .subscribe(
      res=>{
        this.musclesDTOs = res;
      }
    );
    this.GetData();   
  }

  public handlePage(e?: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getExerciseTemplateRequest.page = 1+this.currentPage;
    this.getExerciseTemplateRequest.pageSize = this.pageSize;        
    this.GetData();        
    return e;
  }

  public HandleSearch(){
    this.getExerciseTemplateRequest.filter = this.searchField.controls['search'].value;
    this.getExerciseTemplateRequest.page = 1;
    this.getExerciseTemplateRequest.pageSize = this.pageSize;
    this.GetData();
  }


  GetData(){
    this.exerciseTemplateDTOs=[];
    this.cabinetService.GetExerciseTemplates(this.getExerciseTemplateRequest)
    .subscribe(
      res=> {        
        this.exerciseTemplateDTOs = res.exerciseTemplateDTOs;
        this.currentPage = res.pageIndex;
        this.totalSize = res.length;
        this.pageSize = res.pageSize;
        this.dataSource = new MatTableDataSource<ExerciseTemplateDTO>(this.exerciseTemplateDTOs);        
      }
    );
  }

  GetMuscleById(id: number){

    let muscle = this.musclesDTOs.find(x=>x.id==id);
    
    return muscle;
  }


  deleteExerciseTemplate(id: number){
    this.cabinetService.DeleteExerciseTemplate(id)
    .subscribe(
      res=>{
        if(res.deleted){
          this.HandleSearch();
        }
      }
    );
  }

  SubmitExerciseTemplate(){
    
    this.cabinetService.SaveExerciseTemplate(this.AddExerciseTemplateForm.value)
    .subscribe(
      res=>{
        if(res.saved){
          this.AddExerciseTemplateForm.reset();          
          this.AddExerciseTemplateForm.controls['primaryMuscleId'].setValue(0);
          this.AddExerciseTemplateForm.controls['secondaryMuscleId'].setValue(0);          
          this.HandleSearch();
        }
      }
    );
  }

}
