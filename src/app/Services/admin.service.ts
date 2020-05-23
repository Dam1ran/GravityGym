import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginatedRequest } from '../classes/PageModels/PaginatedRequest';
import { PaginatedResult } from '../classes/PageModels/PaginatedResult';
import { Observable } from 'rxjs';
import { ApplicationUserDTO } from '../classes/ApplicationUserDTO';
import { CoachDTO } from '../classes/CoachDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminEndpoint: string = "/api/Admin/";

  constructor(private http: HttpClient) { }

  public GetUsers(data: PaginatedRequest) : Observable<PaginatedResult<ApplicationUserDTO>>
  {
    const endpoint: string = this.adminEndpoint+'getusers';
    return this.http.post<PaginatedResult<ApplicationUserDTO>>(endpoint,data);
  }

  public GetCoaches() : Observable<CoachDTO[]>
  {
    const endpoint: string = this.adminEndpoint+'getcoaches';
    return this.http.get<CoachDTO[]>(endpoint);
  }

  public SaveUserRole(data) : Observable<any>
  {
    const endpoint: string = this.adminEndpoint+'saveuserrole';
    return this.http.post<any>(endpoint,data);
  }

  public AssignCoach(data) : Observable<any>
  {
    const endpoint: string = this.adminEndpoint+'assigncoach';
    return this.http.post<any>(endpoint,data);
  }

  public UnassignCoach(data) : Observable<any>
  {
    const endpoint: string = this.adminEndpoint+'unassigncoach';
    return this.http.post<any>(endpoint,data);
  }

}
