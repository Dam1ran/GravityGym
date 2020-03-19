import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
/*
export const NameTaken = (authService: AuthService) => {
  return (input: FormControl) => {
    return timer(500).pipe(
      switchMap(() => authService.checkNameNotTaken(input.value)),
      map(res => {
        return res.nameTaken ? null : { nameTaken: true };
      })
    );
  };
};

/*
export function NameTaken(authService: AuthService,control: FormControl): Observable<ValidationErrors | null> {
   return this.service.checkNameNotTaken(control)
    .pipe(debounceTime(500), map((nameTaken: boolean) => { if (nameTaken) {  return {  isExists: true      };   } return null;  }));
}



*/



/*


export function NameTaken(control: FormControl) : {[key:string]:boolean} | null
{  
    let value:{[key:string]:boolean};    

    if(control.value=='koko')
    {
        value = {'nameTaken': true};
        return value;
    }
  
    return null;
}


*/
/*
export function NameTaken   (authService: AuthService)  
{

    return new Promise (resolve => {

        return (input: FormControl) => 
        {
            let value:{[key:string]:boolean};    

            if(authService.checkNameNotTaken(input.value))
            {
                value = {'nameTaken': true};
                return value;
            }
            else
            {
                return false;
            }
        };


    });
    
};*/