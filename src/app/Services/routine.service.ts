import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WoRoutineDTO } from '../classes/WORoutine/WoRoutineDTO';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  routineEndpoint: string = "/api/Routine/";

  constructor(private http: HttpClient) { }

  public GetWORoutinesName() : Observable<WoRoutineDTO[]>
  {
    return this.http.get<WoRoutineDTO[]>(this.routineEndpoint+'getnames');
  }

  public AddWORoutine(data) : Observable<WoRoutineDTO>
  {
    return this.http.post<WoRoutineDTO>(this.routineEndpoint,data);
  }

  public GetWORoutine(id: number) : Observable<WoRoutineDTO>
  {
    return this.http.get<WoRoutineDTO>(this.routineEndpoint+`/${id}`);
  }

  public DeleteWORoutine(id: number)
  {
    return this.http.delete<any>(this.routineEndpoint+`/${id}`);
  }  

}
