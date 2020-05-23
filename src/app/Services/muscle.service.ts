import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MuscleDTO } from '../classes/MuscleDTO';

@Injectable({
  providedIn: 'root'
})
export class MuscleService {
  
  muscleEndpoint: string = "/api/Muscle/";

  constructor(private http: HttpClient) { }
  
  public GetMusclesList() : Observable<MuscleDTO[]>
  {
    return this.http.get<MuscleDTO[]>(this.muscleEndpoint);
  }

}
