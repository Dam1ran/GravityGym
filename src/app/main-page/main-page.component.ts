import { Component, OnInit } from '@angular/core';
import { Fader } from '../Shared/fader';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent extends Fader implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
