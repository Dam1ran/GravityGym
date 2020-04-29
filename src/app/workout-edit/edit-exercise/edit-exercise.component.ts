import { Component, OnInit, Input } from '@angular/core';
import { ExerciseDTO } from 'src/app/classes/WORoutine/ExerciseDTO';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {

  @Input() exerciseDTO: ExerciseDTO;

  panelOpenState: boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.exerciseDTO);
  }

}
