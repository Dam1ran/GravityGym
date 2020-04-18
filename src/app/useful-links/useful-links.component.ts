import { Component, OnInit } from '@angular/core';
import { InformationService } from '../Services/information.service';
import { UsefulLink } from '../classes/UsefulLink';
import { AuthService } from '../Services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-useful-links',
  templateUrl: './useful-links.component.html',
  styleUrls: ['./useful-links.component.scss']
})
export class UsefulLinksComponent implements OnInit {

  constructor(
    private infoService: InformationService,
    private authService: AuthService,
    private fb: FormBuilder 
  ) { }

  public usefulLinkForm : FormGroup;
  public usefulLinks: UsefulLink[];
  private isCoachRole: boolean;

  ngOnInit() {
    
    this.Refresh();

    this.isCoachRole=this.authService.getUserRole() === "Coach" ? true : false;

    this.usefulLinkForm = this.fb.group({
      link: ['',[Validators.required]],
      description: ['',[Validators.required,Validators.minLength(10)]]
    });

  }

  onDelete(id){
    
    this.infoService.DeleteUsefulLinks(id)
    .subscribe
    (
      res=>
      {       
        this.Refresh();
      }

    );

  }


  Refresh(){
    this.infoService.GetUsefulLinks()
    .subscribe
    (
      res=>
      {
        this.usefulLinks = res;        
      },
      err=>{console.log(err)},

    );
  }

  addLink(){
    this.infoService.PostUsefulLinks(this.usefulLinkForm.value)
    .subscribe
    (
      res=>
      {
        this.usefulLinkForm.controls['link'].setValue('');
        this.usefulLinkForm.controls['description'].setValue('');
        this.Refresh();
      } 
    );
  }

}
