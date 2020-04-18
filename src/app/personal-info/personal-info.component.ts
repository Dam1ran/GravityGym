import { Component, OnInit } from '@angular/core';
import { CabinetService } from '../Services/cabinet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  public personalInfoForm : FormGroup;
  public hasErrors: boolean = false;   
  public notification = null;

  constructor(
    private cabinetService: CabinetService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    
    this.personalInfoForm = this.fb.group({
      id:[''],   
      gender:    ['',[Validators.required]],   
      firstName:    ['',[Validators.required]],   
      lastName:    ['',[Validators.required]],   
      age:     ['',[Validators.required,Validators.min(7),Validators.max(120)]],
      heightInCm:     ['',[Validators.required,Validators.min(100),Validators.max(220)]],
      weightInKg:     ['',[Validators.required,Validators.min(30),Validators.max(200)]],
      fitnessExperienceInMonths:  ['',[Validators.required,Validators.min(0),Validators.max(240)]],
      operationsAndFractures:  [''],
      chronicDiseases:  [''],
      otherThingsThatYourCoachShouldKnow:  [''],
      targetGoals:         [''],
      bmi:{value:'',disabled:true}
    });



    this.cabinetService.GetPersonalInfo()
    .subscribe
    (
      res=>
      {
        this.personalInfoForm.controls['id'].setValue(res.id)
        if(res.id!=0)
        {          
          this.personalInfoForm.controls['gender'].setValue(res.gender);
          this.personalInfoForm.controls['age'].setValue(res.age);
          this.personalInfoForm.controls['firstName'].setValue(res.firstName);
          this.personalInfoForm.controls['lastName'].setValue(res.lastName);
          this.personalInfoForm.controls['heightInCm'].setValue(res.heightInCm);
          this.personalInfoForm.controls['weightInKg'].setValue(res.weightInKg);
          this.personalInfoForm.controls['fitnessExperienceInMonths'].setValue(res.fitnessExperienceInMonths);
          this.personalInfoForm.controls['operationsAndFractures'].setValue(res.operationsAndFractures);
          this.personalInfoForm.controls['chronicDiseases'].setValue(res.chronicDiseases);
          this.personalInfoForm.controls['otherThingsThatYourCoachShouldKnow'].setValue(res.otherThingsThatYourCoachShouldKnow);
          this.personalInfoForm.controls['targetGoals'].setValue(res.targetGoals);

          this.onChange();
        }    
        
      }
    );
      
      

  }

  UpdatePersonalInfo(){
        
    this.cabinetService.SavePersonalInfo(this.personalInfoForm.value)
    .subscribe(
      res=>
      {
        this.hasErrors = false;
        this.notification = 'Saved!';
        this.personalInfoForm.disable();    
        setTimeout(()=>{this.notification=null;},2000);    
      },
      err=>{
        console.log(err.error.title);
      }
    )
  }

  onChange(){
    if(
      this.personalInfoForm.controls['weightInKg'].value
      && this.personalInfoForm.controls['heightInCm'].value
      && this.personalInfoForm.controls['weightInKg'].valid
      && this.personalInfoForm.controls['heightInCm'].valid
      )
    {
      let height: number = this.personalInfoForm.controls['heightInCm'].value;
      let weight: number = this.personalInfoForm.controls['weightInKg'].value;     

      let bmi = (weight/((height/100)*(height/100))).toFixed(1);
      this.personalInfoForm.controls['bmi'].setValue(bmi);

    }
  }

}
