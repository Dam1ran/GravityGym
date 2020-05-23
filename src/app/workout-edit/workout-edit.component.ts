import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WorkoutDTO } from '../classes/WORoutine/WorkoutDTO';
import { ExerciseDTO } from '../classes/WORoutine/ExerciseDTO';
import { WorkoutService } from '../Services/workout.service';
import { ExerciseService } from '../Services/exercise.service';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.scss']
})



export class WorkoutEditComponent implements OnInit {
  
  public notification = null;

  @Input() workoutInput : WorkoutDTO;
  exerciseDTOs: ExerciseDTO[];
  workout : WorkoutDTO;  
  
  workoutComments = new FormControl('');

  constructor(
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService
    )  {}

  ngOnInit() {
    this.GetWorkout();
    this.GetExercises();    
  }

  AddWorkoutComments(){    
    let req = Object.assign({}, this.workout);
    req.workoutComments = this.workoutComments.value;
    this.workoutService.UpdateWorkoutDescription(req)
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

  GetWorkout(){
    this.workoutService.GetWorkout(this.workoutInput.id)
    .subscribe(
      res=>{
        this.workout = res;
        this.exerciseDTOs = res.exercises;        
        this.workoutComments.setValue(this.workout.workoutComments);    
      },
      err=>{
        console.log(err);
      }
    );
  }

  GetExercises() {
    this.exerciseService.GetExercisesFromWorkout(this.workoutInput.id)
    .subscribe(
      res=>{this.exerciseDTOs = res;},
      err=>{console.log(err);}
    );
  }

  onUpdateWorkout(event: ExerciseDTO[]){
    this.exerciseDTOs = event;    
  }

  swapDown(exerciseDTO: ExerciseDTO){
    this.exerciseService.SwapDown(exerciseDTO)
    .subscribe(
      res=>{this.exerciseDTOs = res;},
      err=>{console.log(err);}
    );
  }

  swapUp(exerciseDTO: ExerciseDTO){
    this.exerciseService.SwapUp(exerciseDTO)
    .subscribe(
      res=>{this.exerciseDTOs = res;},
      err=>{console.log(err);}
    );
  }

  deleteExercise(exerciseDTO: ExerciseDTO){
    this.exerciseService.DeleteExercise(exerciseDTO.id)
    .subscribe(
      res=>{
        if(res.deleted){
          this.exerciseDTOs.forEach( (item, index) => {
            if(item.id === exerciseDTO.id) this.exerciseDTOs.splice(index,1);
          });
        }
      },
      err=>{console.log(err);}
    );    
  }

}