import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExerciseTemplateDTO } from '../classes/ExerciseTemplateDTO';
import { CabinetService } from '../Services/cabinet.service';
import { tap, debounceTime, distinctUntilChanged, filter, switchMap, finalize } from 'rxjs/operators';
import { GetExerciseTemplateRequest } from '../classes/GetExerciseTemplateRequest';

@Component({
  selector: 'app-select-exercise-template',
  templateUrl: './select-exercise-template.component.html',
  styleUrls: ['./select-exercise-template.component.scss']
})
export class SelectExerciseTemplateComponent implements OnInit {

  etdCtrl = new FormControl();
  isLoading = false;

  filteredETDTOs: ExerciseTemplateDTO[]=[];
  exerciseTemplateDTOs: ExerciseTemplateDTO[] = [];

  exerciseChoosen = false;
  noResults = false;

  constructor(private cabinet: CabinetService) {
    this.etdCtrl.valueChanges.pipe(
      tap(x=>{this.exerciseChoosen = x.name ? true : false}),       
      debounceTime(500),
      distinctUntilChanged(),
      filter(x=>!this.existsByName(x.name)),
      tap(()=>this.isLoading=true),          
      switchMap(text=>this.cabinet.GetExerciseTemplatesT(new GetExerciseTemplateRequest(text.name?text.name:text,1,20)).pipe(finalize(()=>this.isLoading=false))
      .pipe(finalize(() => this.isLoading = false)))          
      )
      .subscribe(
      x=>{
       this.filteredETDTOs = x.exerciseTemplateDTOs;
       this.noResults = this.filteredETDTOs.length == 0;       
      }
    );
  }

  private existsByName(name: string) : boolean  {
    return this.filteredETDTOs.find(x=>x.name===name) ? true : false;
  }

  displayFn(etd: ExerciseTemplateDTO) {
    if (etd) { return etd.name; }
  }

  ngOnInit() {
  }

}
