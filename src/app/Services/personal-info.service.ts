import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalInfo } from '../classes/PersonalInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  
  personalInfoEndpoint: string = "/api/PersonalInfo/";

  constructor(private http: HttpClient) { }

  public GetPersonalInfo() : Observable<PersonalInfo>
  {
    return this.http.get<PersonalInfo>(this.personalInfoEndpoint);
  }

  public SavePersonalInfo(data) : Observable<PersonalInfo>
  {
    return this.http.post<PersonalInfo>(this.personalInfoEndpoint,data);
  }
}
