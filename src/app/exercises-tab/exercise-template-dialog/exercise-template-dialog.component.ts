import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExerciseTemplateDTO } from 'src/app/classes/ExerciseTemplateDTO';
import { MuscleDTO } from 'src/app/classes/MuscleDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  *  as _ from 'lodash';
import { MuscleService } from 'src/app/Services/muscle.service';
import { ExerciseTemplateService } from 'src/app/Services/exercise-template.service';

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
    private muscleService: MuscleService,    
    private exerciseTemplateService: ExerciseTemplateService,
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
    this.muscleService.GetMusclesList()
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
    if(this.AddExerciseTemplateForm.controls['primaryMuscleId'].value === 0) this.AddExerciseTemplateForm.controls['primaryMuscleId'].setValue(null);
    if(this.AddExerciseTemplateForm.controls['secondaryMuscleId'].value === 0) this.AddExerciseTemplateForm.controls['secondaryMuscleId'].setValue(null);
    this.exerciseTemplateService.SaveExerciseTemplate(this.AddExerciseTemplateForm.value)
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
