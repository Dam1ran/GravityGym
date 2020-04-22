import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  ziu = from("abcdefuck");
  foo = from("asdasdas");
  fiu: string = '';

  constructor() { }

  ngOnInit() {
    this.ziu.pipe(
      concatMap(i => of(i).pipe(delay(200))),
    )
    .subscribe(
        value => {
          
            this.fiu += value;
          
        },
        err => console.log(err),
    );

  }    

}
