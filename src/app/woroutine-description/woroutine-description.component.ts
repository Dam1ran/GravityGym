import { Component, OnInit, OnDestroy } from '@angular/core';
import { WORoutineDescriptionService } from '../Services/woroutine-description.service';
import { takeUntil, map, delay, concatMap, takeWhile, tap, take } from 'rxjs/operators';
import { Subject, concat, from, of } from 'rxjs';

@Component({
  selector: 'app-woroutine-description',
  templateUrl: './woroutine-description.component.html',
  styleUrls: ['./woroutine-description.component.scss']
})
export class WORoutineDescriptionComponent implements OnInit, OnDestroy {

  message:string='';
  test: string='';
  private unsubscribe$ = new Subject<void>();

  constructor(private wOdescriptionService: WORoutineDescriptionService) { }

  ngOnInit() {

    this.wOdescriptionService.currentMessage
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(message => {
        if(this.message!=message){
          this.message = message;
        
          let foo = from(this.message);
        
          this.test='';
          const subs = foo.pipe(           
            concatMap(i => of(i).pipe(delay(10)))          
          )
          .subscribe(
            value => {
              
                this.test += value;
                if(this.message!=message){
                  this.test='';
                  subs.unsubscribe();
                }
              
            },
            err => console.log(err),
          );   
      
        }               
      });
        
  }

  ngOnDestroy(): void {
    this.wOdescriptionService.changeMessage('Routine Description');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();    
  }

}
