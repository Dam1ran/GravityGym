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
         MatCardModule,
         MatPaginatorModule,
         MatExpansionModule,
         MatSnackBarModule,
         MatAutocompleteModule,
         MatSlideToggleModule,
         MatSortModule,
         MatTooltipModule,
         MatMenuModule,
         MatBadgeModule
                
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
import { ManageClientsComponent } from './manage-clients/manage-clients.component';
import { ExercisesTabComponent } from './exercises-tab/exercises-tab.component';
import { WorkoutTabComponent } from './workout-tab/workout-tab.component';
import { WorkoutEditComponent } from './workout-edit/workout-edit.component';
import { WorkoutRoutineEditComponent } from './workout-routine-edit/workout-routine-edit.component';
import { WORoutineDescriptionComponent } from './woroutine-description/woroutine-description.component';
import { RollingPipe } from './rolling.pipe';
import { SelectExerciseTemplateComponent } from './workout-edit/select-exercise-template/select-exercise-template.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ExerciseTemplateDialogComponent } from './exercises-tab/exercise-template-dialog/exercise-template-dialog.component';
import { EditApplicationUserDialogComponent } from './manage-users/edit-application-user-dialog/edit-application-user-dialog.component';
import { EditExerciseComponent } from './workout-edit/edit-exercise/edit-exercise.component';



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
    ManageUsersComponent,
    ManageClientsComponent,
    ExercisesTabComponent,
    WorkoutTabComponent,
    WorkoutEditComponent,
    WorkoutRoutineEditComponent,
    WORoutineDescriptionComponent,
    RollingPipe,
    SelectExerciseTemplateComponent,
    ConfirmationDialogComponent,
    ExerciseTemplateDialogComponent,
    EditApplicationUserDialogComponent,
    EditExerciseComponent   
    
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
    ReactiveFormsModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatSortModule,
    MatTooltipModule,
    MatMenuModule
    
  ],
  entryComponents: [LoginDialogComponent,ConfirmationDialogComponent,ExerciseTemplateDialogComponent,EditApplicationUserDialogComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
