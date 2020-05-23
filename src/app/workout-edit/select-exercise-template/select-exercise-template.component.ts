import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap, debounceTime, distinctUntilChanged, filter, switchMap, finalize } from 'rxjs/operators';
import { ExerciseTemplateDTO } from 'src/app/classes/ExerciseTemplateDTO';
import { SimplePaginatedRequest } from 'src/app/classes/PageModels/SimplePaginatedRequest';
import { ExerciseDTO } from 'src/app/classes/WORoutine/ExerciseDTO';
import { ExerciseTemplateService } from 'src/app/Services/exercise-template.service';
import { ExerciseService } from 'src/app/Services/exercise.service';

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

  constructor(
    private exerciseTemplateService: ExerciseTemplateService,
    private exerciseService: ExerciseService) {
    this.etdCtrl.valueChanges.pipe(
      tap(x=>{this.exerciseChoosen = x.name ? true : false;}),       
      debounceTime(500),
      distinctUntilChanged(),
      filter(x=>!this.existsByName(x.name)),
      tap(()=>this.isLoading=true),          
      switchMap(text=>this.exerciseTemplateService.GetExerciseTemplates(
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
      this.exerciseService.AddExerciseToWorkout(exerciseDTO)
      .subscribe(
        res=>{this.updateWorkout.emit(res);},
        err=>{console.log(err);}
      );
      this.etdCtrl.setValue('');
    }

  }

}
