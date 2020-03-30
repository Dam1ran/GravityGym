import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { JwtInterceptor } from './classes/jwt.interceptor'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
         MatToolbarModule, 
         MatSidenavModule,
         MatListModule,
         MatButtonModule,
         MatIconModule,
         MatTabsModule,
         MatTableModule,
         MatDialogModule,
         MatSelectModule,         
         MatFormFieldModule,
         MatInputModule,
         MatProgressSpinner,         
         MatCardModule
                
        }
         from "@angular/material";
import { FlexLayoutModule } from '@angular/flex-layout';
import { UpperToolbarComponent } from './upper-toolbar/upper-toolbar.component';
import { AboutComponent } from './about/about.component';
import { PricesComponent } from './prices/prices.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { CopyrightsComponent } from './copyrights/copyrights.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { GalleryComponent } from './gallery/gallery.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { TuesdayComponent } from './ScheduleDays/tuesday/tuesday.component';
import { MondayComponent } from './ScheduleDays/monday/monday.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CabinetComponent } from './cabinet/cabinet.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AutocompleteDirective } from './autocomplete.directive';
import { UsefulLinksComponent } from './useful-links/useful-links.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';



@NgModule({
  declarations: [
    AppComponent,
    UpperToolbarComponent,
    AboutComponent,
    PricesComponent,
    ContactsComponent,
    MainPageComponent,
    RegisterComponent,
    FooterComponent,
    CopyrightsComponent,
    ScheduleComponent,
    GalleryComponent,
    OurTeamComponent,    
    TuesdayComponent,
    MondayComponent,    
    LoginDialogComponent,
    CabinetComponent,
    MatProgressSpinner,
    AccessDeniedComponent,
    AutocompleteDirective,
    UsefulLinksComponent,
    DayScheduleComponent,
    PersonalInfoComponent,
    ManageUsersComponent
 
    

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,    
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,    
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule   
    
  ],
  entryComponents: [LoginDialogComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
