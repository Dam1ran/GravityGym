import { Pipe, PipeTransform } from '@angular/core';
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Pipe({
  name: 'rolling'
})
export class RollingPipe implements PipeTransform {

  transform(value: string, before: string, after: string): string {
    
    let newStr = `${before} ${value} ${after}`;
    return newStr;

  }

  

}
