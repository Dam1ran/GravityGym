import { Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { Fader } from '../Shared/fader';

@Component({
  selector: 'app-upper-toolbar',
  templateUrl: './upper-toolbar.component.html',
  styleUrls: ['./upper-toolbar.component.scss']
})
export class UpperToolbarComponent extends Fader implements OnInit {

  constructor(
    public dialog: MatDialog,
    private logged: AuthService,
    private router: Router
    ) {
    super();
  }
    

  ngOnInit() {
    this.fade();       
  }


  

  openDialog(): void {
    this.dialog.open(
      LoginDialogComponent,
      { 
        width: '250px',
        panelClass: 'custom-modalbox'
      }
      
    );
  }


  Logged() : boolean{
    return this.logged.isLoggedIn();
  }


  Logout(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    this.router.navigate(['MainPage']);
  }



}
