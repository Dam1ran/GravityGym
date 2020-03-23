import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-monday',
  templateUrl: './monday.component.html',
  styleUrls: ['./monday.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MondayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['Hour', 'Practice'];
  expandedElement: PeriodicElement | null;


}

export interface PeriodicElement {
  Hour: string;  
  Practice: string;  
  description: string;
  thumbnail: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {    
    Hour: "06:00",
    Practice: "BoxFit",    
    description: `Boxfit is a cardiovascular workout with classes lasting between 45 mins to one hour. It is based on the training used for boxing so it includes skipping, boxing drills including footwork and abdominal workouts – all focusing on fitness and toning.`,
    thumbnail: "https://localhost:44390/Upload/31676641_328286194363221_7150243880590376960_n.jpg"

  }, 
  {    
    Hour: "07:00",
    Practice: "CrossFit",    
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, architecto!`,    
    thumbnail: "https://localhost:44390/Upload/boxing-icon.png"

  },
];