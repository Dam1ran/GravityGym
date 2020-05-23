import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExerciseDTO } from '../classes/WORoutine/ExerciseDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exerciseEndpoint: string = "/api/Exercise/";

  constructor(private http: HttpClient) { }

  public AddExerciseToWorkout(data: ExerciseDTO) : Observable<ExerciseDTO[]>
  {
    return this.http.post<ExerciseDTO[]>(this.exerciseEndpoint,data);
  }

  public GetExercisesFromWorkout(id: number) : Observable<ExerciseDTO[]>
  {
    const endpoint: string = this.exerciseEndpoint+'getexercisesfromworkout';
    return this.http.get<ExerciseDTO[]>(endpoint+`/${id}`);
  }

  public DeleteExercise(id: number)
  {
    return this.http.delete<any>(this.exerciseEndpoint+`/${id}`);
  }

  public SwapUp(data: ExerciseDTO) : Observable<ExerciseDTO[]>
  {
    const endpoint: string = this.exerciseEndpoint+'swapup';
    return this.http.post<ExerciseDTO[]>(endpoint,data);
  }

  public SwapDown(data: ExerciseDTO) : Observable<ExerciseDTO[]>
  {
    const endpoint: string = this.exerciseEndpoint+'swapdown';
    return this.http.post<ExerciseDTO[]>(endpoint,data);
  }

}
