import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseSetDTO } from '../classes/WORoutine/ExerciseSetDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  setEndpoint: string = "/api/Set/";

  constructor(private http: HttpClient) { }

  public AddSet(data) : Observable<ExerciseSetDTO>
  {    
    return this.http.post<ExerciseSetDTO>(this.setEndpoint,data);
  }

  public DeleteSet(id: number)
  {
    return this.http.delete<any>(this.setEndpoint+`/${id}`);
  }
}
