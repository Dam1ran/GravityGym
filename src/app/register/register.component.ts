import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterFormValidator } from '../Shared/RegisterForm.validator';
import { Fader } from '../Shared/fader';
import { Observable, of } from 'rxjs';
import { debounceTime, take, switchMap, map, catchError } from 'rxjs/operators';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class RegisterComponent extends Fader implements OnInit {

  public registerForm : FormGroup;
  public errResponse: string = ''; 
  public hasErrors: boolean = false; 
  public bounceTimeMs: number = 1000;


  constructor( 
    private auth:AuthService,
    private fb: FormBuilder    
  ) {
    super();
  }

  ngOnInit() {
    this.fade();
    this.registerForm = this.fb.group({
      userName: ['',[Validators.required,Validators.minLength(4)],[this.validateNameNotTaken.bind(this)]],
      userEmail: ['',[Validators.required,Validators.email]],
      confirmUserEmail: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(6)]]
    },{ validator: RegisterFormValidator});


  
  }

  validateNameNotTaken(control: FormControl) {

    return control.valueChanges.pipe(
      debounceTime(500),      
      take(1),
      switchMap(_ =>
        this.auth
          .isNameTaken(control.value)
          .pipe(    catchError(error => {
            console.log("Error checking Name availability!");
            return of({'nameTaken': false});
          }),
            map(res => res.nameTaken==false ? null : {'nameTaken': true})
          ) 
      )
    );
  }


  onSubmit(){ 

    this.hasErrors = true;

    this.auth.register(this.registerForm.value)
    //.pipe(map((res: Response) => res.json()))
    .subscribe(
        (res) =>
        {
          this.hasErrors = false;
//handle approprietly success registration
          //console.log(res)           
        },
        (error: HttpErrorResponse) =>
        {        
          if(error.status==400)
          {

            this.hasErrors = true;

            let errors:{"code":string,"description":string}[] = error.error.value;
          
            this.errResponse='';
  
            for(let err of errors){              
              this.errResponse+=err.description+"\r\n";
            }
          }
          else
          {
            this.errResponse = "Error";
            console.log("Error");
          }

        });   

  } 

}
