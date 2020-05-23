import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkoutDTO } from '../classes/WORoutine/WorkoutDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  workoutEndpoint: string = "/api/Workout/";

  constructor(private http: HttpClient) { }

  public AddWorkout(data) : Observable<WorkoutDTO>
  {
    return this.http.post<WorkoutDTO>(this.workoutEndpoint,data);
  }

  public UpdateWorkoutDescription(data) : Observable<WorkoutDTO>
  {
    const endpoint: string = this.workoutEndpoint+'updateworkoutdescription';
    return this.http.put<WorkoutDTO>(endpoint,data);
  }

  public GetWorkout(id: number) : Observable<WorkoutDTO>
  {
    return this.http.get<WorkoutDTO>(this.workoutEndpoint+`/${id}`);
  }
  
  public DeleteLastWorkoutFromRoutine(id: number) : Observable<WorkoutDTO>
  {
    const endpoint: string = this.workoutEndpoint+'deletelastworkoutfromroutine';
    return this.http.delete<WorkoutDTO>(endpoint+`/${id}`);
  }
}
