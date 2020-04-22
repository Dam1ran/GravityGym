import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExerciseTemplateDTO } from 'src/app/classes/ExerciseTemplateDTO';
import { MuscleDTO } from 'src/app/classes/MuscleDTO';
import { CabinetService } from 'src/app/Services/cabinet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  *  as _ from 'lodash';

@Component({
  selector: 'app-exercise-template-dialog',
  templateUrl: './exercise-template-dialog.component.html',
  styleUrls: ['./exercise-template-dialog.component.scss']
})
export class ExerciseTemplateDialogComponent implements OnInit {

  loading = true;
  private musclesDTOs: MuscleDTO[];
  public AddExerciseTemplateForm : FormGroup;


  constructor(    
    public dialogRef: MatDialogRef<ExerciseTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExerciseTemplateDTO,
    private cabinetService: CabinetService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.AddExerciseTemplateForm = this.fb.group({  
      id: [0],
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
        if(this.data.primaryMuscleId == null) this.data.primaryMuscleId=0;
        if(this.data.secondaryMuscleId == null) this.data.secondaryMuscleId=0;
        if(this.data.id == null) this.data.id=0;
        this.AddExerciseTemplateForm.setValue(_.omit(this.data,'primaryMuscle','secondaryMuscle'));
        this.loading = false;
      }
    );
  }
  
  SaveExerciseTemplate(){
    this.loading = true;
    this.cabinetService.SaveExerciseTemplate(this.AddExerciseTemplateForm.value)
    .subscribe(
      res=>{
        if(res.saved){
          this.loading = false;
          this.dialogRef.close(true);
        }
      },
      err=>{console.log(err);}
    );
  }

}
