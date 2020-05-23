import { Component, OnInit, Input } from '@angular/core';
import { ExerciseDTO } from 'src/app/classes/WORoutine/ExerciseDTO';
import { ExerciseTemplateDTO } from 'src/app/classes/ExerciseTemplateDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseTemplateService } from 'src/app/Services/exercise-template.service';
import { SetService } from 'src/app/Services/set.service';

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
    private setService: SetService,
    private exerciseTemplateService: ExerciseTemplateService
  ) { }

  ngOnInit() {

    this.AddSetForm = this.fb.group({
      exerciseId: [this.exerciseDTO.id],
      restSecondsBetweenSet: [null,[Validators.required,Validators.min(0),Validators.max(300)]],        
      numberOfReps: [null,[Validators.min(0),Validators.max(50)]], 
      weight: [null,[Validators.min(0),Validators.max(999)]]
    });  

    this.exerciseTemplateService.GetExerciseTemplate(this.exerciseDTO.exerciseTemplateId)
    .subscribe(
      res=>
      {
        this.exerciseTemplateDTO = res;
      },
      err=>{console.log(err);}
    );

  }

  AddSet(){
    this.setService.AddSet(this.AddSetForm.value)
    .subscribe(
      res=>{
        this.exerciseDTO.sets.push(res);
      },
      err=>{console.log(err);}
    );
  }

  DeleteSet(id){
    this.setService.DeleteSet(id)
    .subscribe(
      res=>{
        if(res.deleted){
          this.exerciseDTO.sets.forEach( (item, index) => {
            if(item.id === id) this.exerciseDTO.sets.splice(index,1);
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