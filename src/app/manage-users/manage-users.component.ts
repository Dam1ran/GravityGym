import { Component, OnInit } from '@angular/core';
import { CabinetService } from '../Services/cabinet.service';
import { GetUserRequest } from '../classes/GetUserRequest';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppUserDTO } from '../classes/AppUserDTO';
import { CoachDTO } from '../classes/CoachDTO';
import { SaveUserRoleDTO } from '../classes/SaveUserRoleDTO';
import { ActionCoachDTO } from '../classes/ActionCoachDTO';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  public userRequest = new GetUserRequest(null,1,2);
  public numberOfPages: number;
  public searchUsersForm : FormGroup; 
  private userDTOs: AppUserDTO[];
  private coachesDTOs: CoachDTO[];
  public nextDisabled: boolean;
  public previousDisabled: boolean;
  public saveRoleDisabled: boolean[]=[];
  public saveCoachDisabled: boolean[]=[];

  public roleSaved: boolean;
  public notification = [];


  constructor(
    private cabinetService: CabinetService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    
    this.searchUsersForm = this.fb.group({      
      filter:    [''],
      pageSize:    ['2'],
      page:    [{value: '1', disabled: true },[Validators.min(1)]]
    });
    
   
    this.previousDisabled=true;
    this.GetUsers(this.userRequest);
    this.GetCoaches();

  }

  Next(){

    let page: number = +this.searchUsersForm.controls['page'].value;
    if(page<this.numberOfPages){

      page++;

      this.userRequest.page = page;

      this.previousDisabled = false;        

      if(page==this.numberOfPages)
      {
        this.nextDisabled = true;
      }
      
      
      this.searchUsersForm.controls['page'].setValue(page);    
  
      this.GetUsers(this.userRequest);
    }


    
  }

  Previous(){

    let page: number = +this.searchUsersForm.controls['page'].value;
    
    if(page>1)
    {
      page--;

      this.nextDisabled = false;  

      if(page==1)
      {
        this.previousDisabled = true;        
      }
      

      this.userRequest.page = page;

      this.searchUsersForm.controls['page'].setValue(page);     

      this.GetUsers(this.userRequest);

    }

    
    
  }

  GetUsers(userRequest: GetUserRequest){
    this.saveRoleDisabled=[];
    this.userRequest.pageSize = +this.searchUsersForm.controls['pageSize'].value;
    this.cabinetService.GetUsers(userRequest)
    .subscribe(
      res=>
      {
        this.userDTOs = res.appUserDTOs;
        this.numberOfPages = res.numberOfPages;        
        this.nextDisabled = this.numberOfPages==1 || this.searchUsersForm.controls['page'].value == this.numberOfPages;
        this.previousDisabled = this.searchUsersForm.controls['page'].value == 1;
      }
    );
  }

  GetCoaches(){
    this.cabinetService.GetCoaches()
    .subscribe(
      res=>
      {
        this.coachesDTOs = res;
      }
    );
  }

  GetCoachById(id: number){

    let coachDTO = this.coachesDTOs.find(x=>x.id==id);
    
    return coachDTO;

  }

  Search(){    
    this.userRequest.filter=this.searchUsersForm.controls['filter'].value;    
    this.userRequest.page=1;    
    this.searchUsersForm.controls['page'].setValue(1);
    this.GetUsers(this.userRequest);    
  }

  onSelectionRoleChange(ob,role: number,i: number) {

    let selectedRole = +ob.value;
    this.saveRoleDisabled[i] = selectedRole!=role;
    
  }

  SaveRole(email,id, index){
    let saveUserRoleDTO = new SaveUserRoleDTO();
    saveUserRoleDTO.userEmail=email;
    saveUserRoleDTO.roleId=id;
    this.cabinetService.SaveUserRole(saveUserRoleDTO)
    .subscribe(
      res=>
      {
        this.notification[index] = 'Saved!'
        setTimeout(()=>{this.notification=[];},2000);  
        this.GetUsers(this.userRequest);
        this.GetCoaches();
      }
    );
  }

  onCoachSelectionChange(ob, index){

    let selectedCoachId = +ob.value;

    this.saveCoachDisabled[index] = selectedCoachId!=index && selectedCoachId!=0;

  }

  SaveCoach(userEmail, coachId){

    let actionCoachDTO = new ActionCoachDTO();
    actionCoachDTO.clientEmail = userEmail;

    actionCoachDTO.coachEmail = this.GetCoachById(coachId).email;
   
    this.cabinetService.AssignCoach(actionCoachDTO)
    .subscribe(
      res=>
      {
        this.saveCoachDisabled=[];
        this.GetUsers(this.userRequest);
        this.GetCoaches();        
      }
    );
  }

  UnasignCoach(userEmail, coachId){

    let actionCoachDTO = new ActionCoachDTO();

    actionCoachDTO.clientEmail = userEmail;

    actionCoachDTO.coachEmail = this.GetCoachById(coachId).email;
   
    this.cabinetService.UnassignCoach(actionCoachDTO)
    .subscribe(
      res=>
      {
        this.saveCoachDisabled=[];
        this.GetUsers(this.userRequest);
        this.GetCoaches();        
      }
    );
  }

}
