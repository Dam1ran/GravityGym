import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PricesComponent } from './prices/prices.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './register/register.component';
import { CopyrightsComponent } from './copyrights/copyrights.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { GalleryComponent } from './gallery/gallery.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { AuthGuardService } from './_guards/auth-guard.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


const routes: Routes = [
  {path: 'About', component: AboutComponent },
  {path: 'Prices', component: PricesComponent },
  {path: 'Contacts', component: ContactsComponent },  
  {path: 'MainPage', component: MainPageComponent },  
  {path: 'Register', component: RegisterComponent },  
  {path: 'Copyrights', component: CopyrightsComponent },  
  {path: 'Schedule', component: ScheduleComponent },  
  {path: 'Gallery', component: GalleryComponent },  
  {path: 'OurTeam', component: OurTeamComponent },  
  {path: 'AccessDenied', component: AccessDeniedComponent },  
  {path: 'Cabinet', component: CabinetComponent, canActivate: [AuthGuardService] },  
  {path: '', redirectTo: '/MainPage', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
