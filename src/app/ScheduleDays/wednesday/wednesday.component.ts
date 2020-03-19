import { Component, OnInit } from '@angular/core';
import { LoadScheduleService } from 'src/app/Services/load-schedule.service';
import { WeekDay } from '@angular/common';
import { IDaySchedule } from 'src/app/classes/DaySchedule';

@Component({
  selector: 'app-wednesday',
  templateUrl: './wednesday.component.html',
  styleUrls: ['./wednesday.component.scss']
})
export class WednesdayComponent implements OnInit {

  constructor(private LoadScheduleService: LoadScheduleService) { }

  lstDaySchedule: IDaySchedule[];

  ngOnInit() {
    
  }

  GetSchedule()
  {
    this.LoadScheduleService.GetSchedule(WeekDay.Thursday).subscribe
    (
      data=> {
        this.lstDaySchedule = data;
        console.log(this.lstDaySchedule)
                
      }
        
    );

  }
}
