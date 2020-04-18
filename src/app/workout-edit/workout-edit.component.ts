import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CabinetService } from '../Services/cabinet.service';
import { WorkoutDTO } from '../classes/WORoutine/WorkoutDTO';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.scss']
})



export class WorkoutEditComponent implements OnInit {

  
  public notification = null;


  @Input() workoutInput : WorkoutDTO;  

  workout : WorkoutDTO;  
  
  workoutComments = new FormControl('');

  constructor(private cabinet: CabinetService)  {}

  ngOnInit() {
    this.cabinet.GetWorkout(this.workoutInput.id)
    .subscribe(
      res=>{
        this.workout = res;
        this.workoutComments.setValue(this.workout.workoutComments);    
      },
      err=>{
        console.log(err);
      }
    );
  }



  AddWorkoutComments(){    
    let req = Object.assign({}, this.workout);
    req.workoutComments = this.workoutComments.value;
    this.cabinet.UpdateWorkoutDescription(req)
    .subscribe(
      res=>{        
        this.workout = res;           
        this.workoutComments.setValue(res.workoutComments);
        this.workoutComments.markAsPristine();        
        this.notification = 'Saved!';
        setTimeout(()=>{this.notification=null;},2000); 
      },
      err=>{console.log(err);}
    );
  }

}