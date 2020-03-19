import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Fader } from '../Shared/fader';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CabinetComponent extends Fader implements OnInit {

  constructor(private auth: AuthService) { super() }

  ngOnInit() {
    this.fade()
  }

  kek(){
    this.auth.zeze().subscribe(
      res=>{console.log(res);}
    );
  }
}
