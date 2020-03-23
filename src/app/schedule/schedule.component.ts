import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Fader } from '../Shared/fader';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ScheduleComponent extends Fader implements OnInit {

  constructor() { super() }

  private WeekDays: string[] = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

  ngOnInit() {
    this.fade();
  }
  

}
