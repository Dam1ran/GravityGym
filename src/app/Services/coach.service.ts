import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientDTO } from '../classes/ClientDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  coachEndpoint: string = "/api/Coach/";

  constructor(private http: HttpClient) { }

  public GetMyClients() : Observable<ClientDTO[]>
  {
    const endpoint: string = this.coachEndpoint+'getmyclients';
    return this.http.get<ClientDTO[]>(endpoint);
  }
  
}
