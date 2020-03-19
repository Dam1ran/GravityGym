import { Component, OnInit } from '@angular/core';
import { Fader } from '../Shared/fader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent extends Fader implements OnInit  {

    
    constructor(private router: Router) {
    super();
  }

  ngOnInit() {
    this.fade();
  }

  onClick(){
    this.router.navigate(['MainPage']);
  }

}
