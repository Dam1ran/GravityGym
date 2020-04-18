import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabinetService } from '../Services/cabinet.service';
import { WORoutineDescriptionService } from '../Services/woroutine-description.service';
import { WoRoutineDTO } from '../classes/WORoutine/WoRoutineDTO';
import { WorkoutDTO } from '../classes/WORoutine/WorkoutDTO';
import { MatTabGroup, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-workout-routine-edit',
  templateUrl: './workout-routine-edit.component.html',
  styleUrls: ['./workout-routine-edit.component.scss']
})
export class WorkoutRoutineEditComponent implements OnInit {

  @Input() routine : WoRoutineDTO;  
  numberOfWorkouts: number = 0;
  @ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;
  workouts: WorkoutDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private woDescService: WORoutineDescriptionService,
    private cabinetService: CabinetService,
    public dialog: MatDialog) {  }

  ngOnInit() {
  }

  ngOnChanges() {        
    if(this.routine) {      
      this.cabinetService.GetWORoutine(this.routine.id)
      .subscribe(
        res=>{        
          this.woDescService.changeMessage(res.description);          
          this.numberOfWorkouts = res.workouts.length;          
          this.workouts = res.workouts;   
          setTimeout(()=>
          {            
            this.tabGroup.selectedIndex = 0;
          },100);          
        });
    }

  }

  GetWorkout(order: number) : WorkoutDTO {
    return this.workouts.find(x=>x.order===order);
  }

  AddWorkout(){
    let request = new WorkoutDTO;
    request.order = this.numberOfWorkouts;
    request.estimatedMin = 60;
    request.woRoutineId = this.routine.id;

    this.cabinetService.AddWorkout(request)
    .subscribe(
      res=>{
        this.workouts.push(res);
        this.numberOfWorkouts++;
        setTimeout(()=>
        {            
          this.tabGroup.selectedIndex = this.tabGroup._tabs.length-2;
        },100);   
      },
      err=>{console.log(err);}
    );

  }

  RemoveLastWorkout(){
    this.cabinetService.DeleteLastWorkoutFromRoutine(this.routine.id)
    .subscribe(
      res=>
      {
        const workout = this.workouts.find(x=>x.id===res.id);
        const index: number = this.workouts.indexOf(workout);
        if( index !==-1 ){
          this.workouts.splice(index,1);
          this.numberOfWorkouts--;        
          setTimeout(()=>
          {            
            this.tabGroup.selectedIndex = this.tabGroup._tabs.length-2;
          },100);    
        }
      
      },
      err=>{console.log(err);}
    );

  }


  RemoveLastWorkoutDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Confirm the deletion?",
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.RemoveLastWorkout();
      }
    });
  }
}
