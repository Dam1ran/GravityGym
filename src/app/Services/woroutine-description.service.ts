import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WORoutineDescriptionService {

  private descriptionSource = new BehaviorSubject('Routine Description');
  currentMessage = this.descriptionSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.descriptionSource.next(message);    
  }
}
