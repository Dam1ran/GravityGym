import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalInfo } from '../classes/PersonalInfo';
import { Observable } from 'rxjs';
import { AppUserDTOsResponse } from '../classes/AppUserDTOsResponse';
import { GetUserRequest } from '../classes/GetUserRequest';
import { CoachDTO } from '../classes/CoachDTO';
import { ClientDTO } from '../classes/ClientDTO';
import { ExerciseTemplateDTO } from '../classes/ExerciseTemplateDTO';
import { GetExerciseTemplateRequest } from '../classes/GetExerciseTemplateRequest';
import { ExerciseTemplateDTOResponse } from '../classes/ExerciseTemplateDTOResponse';
import { MuscleDTO } from '../classes/MuscleDTO';
import { WoRoutineDTO } from '../classes/WORoutine/WoRoutineDTO';
import { WorkoutDTO } from '../classes/WORoutine/WorkoutDTO';
import { PaginatedRequest } from '../classes/PageModels/PaginatedRequest';
import { PaginatedResult } from '../classes/PageModels/PaginatedResult';


@Injectable({
  providedIn: 'root'
})
export class CabinetService {

  constructor(private http: HttpClient) { }
  
  cabinet: string = "/api/Cabinet/";

  public GetPersonalInfo() : Observable<PersonalInfo>
  {
    const endpoint: string = this.cabinet+'getpersonalinfo';

    return this.http.get<PersonalInfo>(endpoint);
  }

  public SavePersonalInfo(data) : Observable<PersonalInfo>
  {
    const endpoint: string = this.cabinet+'savepersonalinfo';

    return this.http.post<PersonalInfo>(endpoint,data);
  }

  public GetUsers(data: GetUserRequest) : Observable<AppUserDTOsResponse>
  {
    const endpoint: string = this.cabinet+'getusers';   

    return this.http.post<AppUserDTOsResponse>(endpoint,data);
  }

  public GetCoaches() : Observable<CoachDTO[]>
  {
    const endpoint: string = this.cabinet+'getcoaches';   

    return this.http.get<CoachDTO[]>(endpoint);
  }

  public SaveUserRole(data) : Observable<any>
  {
    const endpoint: string = this.cabinet+'saveuserrole';

    return this.http.post<any>(endpoint,data);
  }

  public AssignCoach(data) : Observable<any>
  {
    const endpoint: string = this.cabinet+'assigncoach';

    return this.http.post<any>(endpoint,data);
  }

  public UnassignCoach(data) : Observable<any>
  {
    const endpoint: string = this.cabinet+'unassigncoach';

    return this.http.post<any>(endpoint,data);
  }

  public GetMyClients() : Observable<ClientDTO[]>
  {
    const endpoint: string = this.cabinet+'getmyclients';

    return this.http.get<ClientDTO[]>(endpoint);
  }

  public GetExerciseTemplatesT(data: GetExerciseTemplateRequest) : Observable<ExerciseTemplateDTOResponse>
  {
    const endpoint: string = this.cabinet+'getexercisetemplates';

    return this.http.post<ExerciseTemplateDTOResponse>(endpoint,data);
  }

  public GetExerciseTemplates(paginatedRequest: PaginatedRequest): Observable<PaginatedResult<ExerciseTemplateDTO>> {

    return this.http.post<PaginatedResult<ExerciseTemplateDTO>>(this.cabinet + 'getexercisetemplates', paginatedRequest);

  }

  public GetMusclesList() : Observable<MuscleDTO[]>
  {
    const endpoint: string = this.cabinet+'getmuscles';

    return this.http.get<MuscleDTO[]>(endpoint);
  }

  public DeleteExerciseTemplate(id: number)
  {
    const endpoint: string = this.cabinet+'deleteexercisetemplate';
    return this.http.delete<any>(endpoint+`/${id}`);
  }

  public SaveExerciseTemplate(data) : Observable<any>
  {
    const endpoint: string = this.cabinet+'saveexercisetemplate';

    return this.http.post<any>(endpoint,data);
  }

  public AddWORoutine(data) : Observable<WoRoutineDTO>
  {
    const endpoint: string = this.cabinet+'addworkoutroutine';

    return this.http.post<WoRoutineDTO>(endpoint,data);
  }

  public GetWORoutinesName() : Observable<WoRoutineDTO[]>
  {
    const endpoint: string = this.cabinet+'getworkoutroutinesname';

    return this.http.get<WoRoutineDTO[]>(endpoint);
  }

  public GetWORoutine(id: number) : Observable<WoRoutineDTO>
  {
    const endpoint: string = this.cabinet+'getroutine';

    return this.http.get<WoRoutineDTO>(endpoint+`/${id}`);
  }

  public DeleteWORoutine(id: number)
  {
    const endpoint: string = this.cabinet+'deleteworkoutroutine';
    return this.http.delete<any>(endpoint+`/${id}`);
  }

  public AddWorkout(data) : Observable<WorkoutDTO>
  {
    const endpoint: string = this.cabinet+'createworkoutinroutine';

    return this.http.post<WorkoutDTO>(endpoint,data);
  }

  public UpdateWorkoutDescription(data) : Observable<WorkoutDTO>
  {
    const endpoint: string = this.cabinet+'updateworkoutdescription';

    return this.http.put<WorkoutDTO>(endpoint,data);
  }

  public GetWorkout(id: number) : Observable<WorkoutDTO>
  {
    const endpoint: string = this.cabinet+'getworkout';

    return this.http.get<WorkoutDTO>(endpoint+`/${id}`);
  }

  public DeleteWorkout(id: number)
  {
    const endpoint: string = this.cabinet+'deleteworkout';
    return this.http.delete<any>(endpoint+`/${id}`);
  }

  public DeleteLastWorkoutFromRoutine(id: number) : Observable<WorkoutDTO>
  {
    const endpoint: string = this.cabinet+'deletelastworkoutfromroutine';
    return this.http.delete<WorkoutDTO>(endpoint+`/${id}`);
  }

}

