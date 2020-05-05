import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap, debounceTime, distinctUntilChanged, filter, switchMap, finalize } from 'rxjs/operators';
import { CabinetService } from 'src/app/Services/cabinet.service';
import { ExerciseTemplateDTO } from 'src/app/classes/ExerciseTemplateDTO';
import { SimplePaginatedRequest } from 'src/app/classes/PageModels/SimplePaginatedRequest';
import { ExerciseDTO } from 'src/app/classes/WORoutine/ExerciseDTO';

@Component({
  selector: 'app-select-exercise-template',
  templateUrl: './select-exercise-template.component.html',
  styleUrls: ['./select-exercise-template.component.scss']
})
export class SelectExerciseTemplateComponent implements OnInit {

  etdCtrl = new FormControl();
  isLoading = false;
  @Input() workoutId : number;
  @Output() updateWorkout: EventEmitter<ExerciseDTO[]> = new EventEmitter<ExerciseDTO[]>();
  filteredETDTOs: ExerciseTemplateDTO[]=[];
  exerciseTemplateDTOs: ExerciseTemplateDTO[] = [];  

  exerciseChoosen = false;
  noResults = false;

  constructor(private cabinet: CabinetService) {
    this.etdCtrl.valueChanges.pipe(
      tap(x=>{this.exerciseChoosen = x.name ? true : false;}),       
      debounceTime(500),
      distinctUntilChanged(),
      filter(x=>!this.existsByName(x.name)),
      tap(()=>this.isLoading=true),          
      switchMap(text=>this.cabinet.GetExerciseTemplates(
        new SimplePaginatedRequest("name",text.name?text.name:text)
        ).pipe(finalize(()=>this.isLoading=false))
      .pipe(finalize(() => this.isLoading = false)))          
      )
      .subscribe(
      res=>{
       this.filteredETDTOs = res.items;
       this.noResults = this.filteredETDTOs.length == 0;       
      }
    );
  }

  // private existsByName(name: string) : boolean  {
  //   return this.filteredETDTOs.find(x=>x.name===name) ? true : false;
  // }

  private existsByName = (name: string)=> this.filteredETDTOs.find(x=>x.name===name) ? true : false;
  

  displayFn(etd: ExerciseTemplateDTO) {
    if (etd) { return etd.name; }
  }

  ngOnInit() {
  }

  AddExerciseToWorkout(){
    if(this.etdCtrl.value.id)
    {
      const exerciseDTO = new ExerciseDTO();
      exerciseDTO.exerciseTemplateId = this.etdCtrl.value.id;
      exerciseDTO.workoutId = this.workoutId;
      this.cabinet.AddExerciseToWorkout(exerciseDTO)
      .subscribe(
        res=>{this.updateWorkout.emit(res);},
        err=>{console.log(err);}
      );
      this.etdCtrl.setValue('');
    }

  }

}
