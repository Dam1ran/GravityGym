import { Component, OnInit } from '@angular/core';
import { Fader } from '../Shared/fader';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent extends Fader implements OnInit {

  slogan: string[] = ["W","h","e","r","e", " ", "T", "h", "e", " ", "F","o","r","c","e"," ", "M","e","e","t","s"," ", "T","h","e", " ","G","o","a","l","s","!"];
  applyGlow: boolean[]= new Array(this.slogan.length).fill(false);

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    for(let i = this.slogan.length; i>=0 ; i--) {
      setTimeout(()=>
      {            
        this.applyGlow[i] = true;      
      },7100-i*90);
    }    
  }

}
