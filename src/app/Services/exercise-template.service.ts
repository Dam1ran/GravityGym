import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '../classes/PageModels/PaginatedResult';
import { ExerciseTemplateDTO } from '../classes/ExerciseTemplateDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseTemplateService {

  exerciseTemplateEndpoint: string = "/api/ExerciseTemplate/";

  constructor(private http: HttpClient) { }
  
  public GetExerciseTemplates(paginatedRequest): Observable<PaginatedResult<ExerciseTemplateDTO>> {
    return this.http.post<PaginatedResult<ExerciseTemplateDTO>>(this.exerciseTemplateEndpoint + 'getexercisetemplates', paginatedRequest);
  }

  public GetExerciseTemplate(id: number) : Observable<ExerciseTemplateDTO>
  {
    return this.http.get<ExerciseTemplateDTO>(this.exerciseTemplateEndpoint+`/${id}`);
  }

  public DeleteExerciseTemplate(id: number)
  {
    return this.http.delete<any>(this.exerciseTemplateEndpoint+`/${id}`);
  }

  public SaveExerciseTemplate(data) : Observable<any>
  {
    return this.http.post<any>(this.exerciseTemplateEndpoint,data);
  }
}
