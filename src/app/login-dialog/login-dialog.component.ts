import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BearerToken } from '../classes/BearerToken';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  public loginForm : FormGroup;
  public wrongCredentials: boolean = false;
  shakeIt = false;


  constructor( 
      public dialogRef: MatDialogRef<LoginDialogComponent>,
      private auth:AuthService,
      private fb: FormBuilder,
      public snackBar: MatSnackBar,
      private router: Router
  ) {}


  ngOnInit() {
    this.loginForm = this.fb.group({
      userEmail: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]]
    });
    
  }

  closeModal(): void {    
    this.dialogRef.close();    
  }

  onSubmit(){ 

    this.auth.login(this.loginForm.value)
    .subscribe(
         (bearerToken: BearerToken) =>{
           localStorage.setItem('accessToken', bearerToken.accessToken);
           console.log(bearerToken.expiration);
           console.log(bearerToken.userEmail);
           console.log(bearerToken.userRole);
           localStorage.setItem('userRole',bearerToken.userRole);           
           this.closeModal();
           this.router.navigate(['MainPage']);
           this.Message('Logged In');

          },
         (err) =>{
           this.wrongCredentials=true;
           this.shakeDialog();
          });   

  }

  shakeDialog() {
    this.shakeIt = true;
    setTimeout((arg) => {
      this.shakeIt = false;
    },
    300);
  }

  Message(msg: string){
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 1500;
    config.panelClass = ['snackPanel']
    
    this.snackBar.open(msg,null, config);
  }

}
