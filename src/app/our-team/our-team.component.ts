import { Component, OnInit } from '@angular/core';
import { Fader } from '../Shared/fader';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OurTeamMember } from '../classes/OurTeamMember';
import { MemberService } from '../Services/member.service';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent extends Fader implements OnInit {

  private isAdminRole: boolean;
  public ourTeamMembers: OurTeamMember[];
  public ourTeamForm : FormGroup;
  avatarToUpload: File = null;
  imageToUpload: File = null;


  constructor(
    private memberService: MemberService,
    private authService: AuthService,
    private fb: FormBuilder
    ) { super(); }

  ngOnInit() {
    this.fade();
    this.Refresh();
    this.ourTeamForm = this.fb.group({   
      avatarUrl:    ['',[Validators.required]],   
      fullName:     ['',[Validators.required]],
      activity:     ['',[Validators.required]],
      imageUrl:     ['',[Validators.required]],
      description:  ['',[Validators.required]],
      moto:         ['',[Validators.required]]
    });

    this.isAdminRole=this.authService.getUserRole() === "Admin" ? true : false;   

  }

  handleAvatarInput(file: FileList){
    this.avatarToUpload = file.item(0);
  }

  handleImageInput(file: FileList){
    this.imageToUpload = file.item(0);    
  }


  Refresh(){
    this.memberService.GetTeamMembers()
    .subscribe(
      res=>
      {
        this.ourTeamMembers = res;        
      }
    )
  }

  addTeamMember(){    
    let ourTeamMember : OurTeamMember = new OurTeamMember();

    ourTeamMember.fullName    = this.ourTeamForm.controls['fullName'].value;
    ourTeamMember.activity    = this.ourTeamForm.controls['activity'].value;
    ourTeamMember.description = this.ourTeamForm.controls['description'].value;
    ourTeamMember.moto        = this.ourTeamForm.controls['moto'].value;
    
    this.memberService.SubmitOurTeamMember(this.avatarToUpload,this.imageToUpload,ourTeamMember)
    .subscribe(
      res=>
      {        
        this.ourTeamForm.reset();
        this.Refresh();
      }
    );
  }

  deleteTeamMember(id){
    this.memberService.DeleteTeamMember(id)
    .subscribe
    (
      res=>
      {
        console.log("Deleted");
        this.Refresh();
      }
    );
  }

}
