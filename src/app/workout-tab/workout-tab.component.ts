import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WoRoutineDTO } from '../classes/WORoutine/WoRoutineDTO';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { WORoutineDescriptionService } from '../Services/woroutine-description.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { RoutineService } from '../Services/routine.service';

@Component({
  selector: 'app-workout-tab',
  templateUrl: './workout-tab.component.html',
  styleUrls: ['./workout-tab.component.scss']
})
export class WorkoutTabComponent implements OnInit {

  panelOpenState = false;
  openWORoutineEditor = false;
  public routineSelected: number = 0;

  wORoutinesName: WoRoutineDTO[]=[];

  public AddRoutineForm : FormGroup;
  public RoutineSelectorForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    private routineService: RoutineService,
    public snackBar: MatSnackBar,
    private woDescService: WORoutineDescriptionService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.AddRoutineForm = this.fb.group({
      title: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(255)]],        
      description: ['',[Validators.required,Validators.minLength(20),Validators.maxLength(1000)]]      
    });    

    this.RoutineSelectorForm = this.fb.group({
      rSelector: ['',[Validators.required]]      
    });

    this.routineService.GetWORoutinesName()
    .subscribe(
      res=>{
        this.wORoutinesName = res;
        if(this.wORoutinesName.length===0){
          this.RoutineSelectorForm.controls['rSelector'].disable();
        }
      }
    );

    
  }


  AddRoutine(){
    this.panelOpenState = false;   

    this.routineService.AddWORoutine(this.AddRoutineForm.value)
    .subscribe(
      res=>{
        this.wORoutinesName.push(res);   
        if(this.wORoutinesName.length>0){
          this.RoutineSelectorForm.controls['rSelector'].enable();
          this.RoutineSelectorForm.controls['rSelector'].setValue(res.id);
          this.routineSelected = res.id;
          this.Message("Routine Added");
        }     
      }
    );

    this.AddRoutineForm.reset();
  }

  RemoveRoutine( id: number ){
    if( id!==0 ){
      this.woDescService.changeMessage('Routine Description');
      this.routineService.DeleteWORoutine(id)
      .subscribe(
        res=>{
          if(res.deleted){

            this.wORoutinesName.forEach( (item, index) => {
              if(item.id === id) this.wORoutinesName.splice(index,1);
            });

            this.RoutineSelectorForm.reset();     
            this.RoutineSelectorForm.controls['rSelector'].setValue('');
            if(this.wORoutinesName.length===0){
              this.RoutineSelectorForm.controls['rSelector'].disable();
            }
            this.Message("Routine Removed");
            this.routineSelected = 0;
            this.openWORoutineEditor = false;
          }
        }
      );
    }
  }

  Message(msg: string){
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 1500;
    config.panelClass = ['snackPanel']
    
    this.snackBar.open(msg,null, config);
  }

  OpenWORoutineEditor(){
    this.openWORoutineEditor = !this.openWORoutineEditor;
  }

  onSelectionRoutineChange(){
    this.openWORoutineEditor = false;
    let temp = this.routineSelected;
    this.routineSelected = 0;
    setTimeout(()=>
    {            
      this.routineSelected = temp;
    },100);  
    this.woDescService.changeMessage('Routine Description');

  }

  accOpened(){
    this.RoutineSelectorForm.controls['rSelector'].disable();
  }

  accClosed(){
    if(this.wORoutinesName.length!==0){
      this.RoutineSelectorForm.controls['rSelector'].enable();
    }
  }
  
  SendWorkoutRoutine(id: number) : WoRoutineDTO{
    return this.wORoutinesName.find(x=>x.id==id);
  }

  RemoveRoutineDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Confirm the deletion?",
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.RemoveRoutine(id);
      }
    });
  }

}
