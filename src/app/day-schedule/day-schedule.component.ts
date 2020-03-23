import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DaySchedule } from '../classes/DaySchedule';
import { InformationService } from '../Services/information.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DayScheduleComponent implements OnInit {
  
  @Input() dayOfWeek : string;
  

  private isAdminRole: boolean;
  public dayScheduleForm : FormGroup;
  public daySchedules: DaySchedule[];
  fileToUpload: File = null;
  columnsToDisplay = ['time', 'practice'];
  expandedElement: DaySchedule | null;
  /*
  dataSource = ELEMENT_DATA;
  */
  constructor(
    private infoService: InformationService,
    private authService: AuthService,
    private fb: FormBuilder 
  ) { }


  ngOnInit() {    

    this.dayScheduleForm = this.fb.group({   
      practice: ['',[Validators.required]],   
      hourMinute: ['',[Validators.required]],
      description: ['',[Validators.required]],
      imageUrl: ['',[Validators.required]]
    });

    this.isAdminRole=this.authService.getUserRole() === "Admin" ? true : false;   

    this.Refresh();   
    
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  addSchedule(){
    
    let daySchedule : DaySchedule = new DaySchedule();

    daySchedule.dayOfWeek = this.dayOfWeek;
    daySchedule.Practice = this.dayScheduleForm.controls['practice'].value;
    daySchedule.description = this.dayScheduleForm.controls['description'].value;
    daySchedule.Time = this.dayScheduleForm.controls['hourMinute'].value;    

    
    this.infoService.SubmitSchedule(this.fileToUpload,daySchedule)
    .subscribe(
      res=>
      {         
        this.dayScheduleForm.controls['practice'].setValue('');
        this.dayScheduleForm.controls['hourMinute'].setValue('');
        this.dayScheduleForm.controls['imageUrl'].setValue('');
        this.dayScheduleForm.controls['description'].setValue('');
        this.Refresh();
      }
    );
  }

  onDelete(id){
    
    this.infoService.DeleteSchedule(id).subscribe
    (
      res=>
      {        
        this.Refresh();
      }

    )       
  }


  Refresh(){

    this.infoService.GetScheduleForDay(this.dayOfWeek)
    .subscribe(
      res=>
      {
        this.daySchedules = res;        
      }
    );

  }

}
