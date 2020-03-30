import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalInfo } from '../classes/PersonalInfo';
import { Observable } from 'rxjs';
import { UserDTOsResponse } from '../classes/UserDTOsResponse';
import { GetUserRequest } from '../classes/GetUserRequest';
import { CoachDTO } from '../classes/CoachDTO';


@Injectable({
  providedIn: 'root'
})
export class CabinetService {

  constructor(private http: HttpClient) { }
  

  public GetPersonalInfo() : Observable<PersonalInfo>
  {
    const endpoint: string = 'https://localhost:44390/api/Cabinet/getpersonalinfo';

    return this.http.get<PersonalInfo>(endpoint);
  }

  public SavePersonalInfo(data) : Observable<PersonalInfo>
  {
    const endpoint: string = 'https://localhost:44390/api/Cabinet/savepersonalinfo';

    return this.http.post<PersonalInfo>(endpoint,data);
  }

  public GetUsers(data: GetUserRequest) : Observable<UserDTOsResponse>
  {
    const endpoint: string = 'https://localhost:44390/api/Cabinet/getusers';   

    return this.http.post<UserDTOsResponse>(endpoint,data);
  }

  public GetCoaches() : Observable<CoachDTO[]>
  {
    const endpoint: string = 'https://localhost:44390/api/Cabinet/getcoaches';   

    return this.http.get<CoachDTO[]>(endpoint);
  }

  public SaveUserRole(data) : Observable<any>
  {
    const endpoint: string = 'https://localhost:44390/api/Cabinet/saveuserrole';

    return this.http.post<any>(endpoint,data);
  }

  public AssignCoach(data) : Observable<any>
  {
    const endpoint: string = 'https://localhost:44390/api/Cabinet/assigncoach';

    return this.http.post<any>(endpoint,data);
  }

  public UnassignCoach(data) : Observable<any>
  {
    const endpoint: string = 'https://localhost:44390/api/Cabinet/unassigncoach';

    return this.http.post<any>(endpoint,data);
  }

}
