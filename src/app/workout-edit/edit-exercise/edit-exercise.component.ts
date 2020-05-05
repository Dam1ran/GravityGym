import { Component, OnInit, Input } from '@angular/core';
import { ExerciseDTO } from 'src/app/classes/WORoutine/ExerciseDTO';
import { CabinetService } from 'src/app/Services/cabinet.service';
import { ExerciseTemplateDTO } from 'src/app/classes/ExerciseTemplateDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {

  @Input() exerciseDTO: ExerciseDTO;
  exerciseTemplateDTO: ExerciseTemplateDTO;
  panelOpenState: boolean;

  public AddSetForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    private cabinet: CabinetService
  ) { }

  ngOnInit() {

    this.AddSetForm = this.fb.group({
      exerciseId: [this.exerciseDTO.id],
      restSecondsBetweenSet: [null,[Validators.required,Validators.min(0),Validators.max(300)]],        
      numberOfReps: [null,[Validators.min(0),Validators.max(50)]], 
      weight: [null,[Validators.min(0),Validators.max(999)]]
    });  

    this.cabinet.GetExerciseTemplate(this.exerciseDTO.exerciseTemplateId)
    .subscribe(
      res=>
      {
        this.exerciseTemplateDTO = res;
      },
      err=>{console.log(err);}
    );

  }

  AddSet(){
    this.cabinet.AddSet(this.AddSetForm.value)
    .subscribe(
      res=>{
        this.exerciseDTO.exerciseSets.push(res);
      },
      err=>{console.log(err);}
    );
  }

  DeleteSet(id){
    this.cabinet.DeleteSet(id)
    .subscribe(
      res=>{
        if(res.deleted){
          this.exerciseDTO.exerciseSets.forEach( (item, index) => {
            if(item.id === id) this.exerciseDTO.exerciseSets.splice(index,1);
          });
        }
      },
      err=>{console.log(err);}
    );
  }

  ClearFields(){
    this.AddSetForm.reset();
    this.AddSetForm.controls['exerciseId'].setValue(this.exerciseDTO.id);
  }

}