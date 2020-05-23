import { Component, OnInit, Inject } from '@angular/core';
import { ApplicationUserDTO } from 'src/app/classes/ApplicationUserDTO';
import { CoachDTO } from 'src/app/classes/CoachDTO';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import  *  as _ from 'lodash';
import { SaveUserRoleDTO } from 'src/app/classes/SaveUserRoleDTO';
import { ActionCoachDTO } from 'src/app/classes/ActionCoachDTO';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-edit-application-user-dialog',
  templateUrl: './edit-application-user-dialog.component.html',
  styleUrls: ['./edit-application-user-dialog.component.scss']
})
export class EditApplicationUserDialogComponent implements OnInit {

  loading = true;
  private coachesDTOs: CoachDTO[];
  public EditApplicationUserForm : FormGroup;
  saveRoleDisabled = true;
  saveCoachDisabled = true;
  public notification;
  selectedRole;
  selectedCoachId;


  constructor(    
    public dialogRef: MatDialogRef<EditApplicationUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApplicationUserDTO,
    private adminService: AdminService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.EditApplicationUserForm = this.fb.group({        
      fullName:    [{value:this.data.fullName, disabled: true}],
      email:    [{value:this.data.email, disabled: true}],
      coachId:    [this.data.coachId]
    });
    this.GetCoaches();
  }
  
  GetCoaches(){
    this.adminService.GetCoaches()
    .subscribe(
      res=>{
        this.coachesDTOs = res;
        this.loading = false;
      }
    );
  }

  onCoachSelectionChange(event,id){
    this.saveCoachDisabled=event.value===id;
  }

  SaveCoach(userEmail, coachId){    
    let actionCoachDTO = new ActionCoachDTO();
    actionCoachDTO.clientEmail = userEmail;
    actionCoachDTO.coachEmail = this.coachesDTOs.find(x=>x.id===coachId).email;
   
    this.adminService.AssignCoach(actionCoachDTO)
    .subscribe(
      res=>
      {
        this.saveCoachDisabled=true;
        this.GetCoaches();        
        this.data.coachId = coachId;
      }
    );
  }

  UnasignCoach(userEmail, coachId){
    let actionCoachDTO = new ActionCoachDTO();
    actionCoachDTO.clientEmail = userEmail;
    actionCoachDTO.coachEmail = this.coachesDTOs.find(x=>x.id===coachId).email;
   
    this.adminService.UnassignCoach(actionCoachDTO)
    .subscribe(
      res=>
      {
        this.saveCoachDisabled=true;
        this.data.coachId = 0;
        this.EditApplicationUserForm.controls['coachId'].setValue(0);
        this.GetCoaches();        
      }
    );
  }

  onSelectionRoleChange(event, id){
    this.saveRoleDisabled=event.value===id;
  }

  SaveRole(email,roleId){
    let saveUserRoleDTO = new SaveUserRoleDTO();
    saveUserRoleDTO.userEmail=email;
    saveUserRoleDTO.roleId=roleId;
    this.adminService.SaveUserRole(saveUserRoleDTO)
    .subscribe(
      res=>
      {
        this.data.userRoleId = roleId;
        this.selectedRole = roleId;
        this.saveRoleDisabled = true;
        this.notification = 'Saved!'
        this.GetCoaches()
        setTimeout(()=>{this.notification=null;},2000);
      }
    );
  }

}
