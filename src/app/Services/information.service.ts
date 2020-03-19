import { Injectable } from '@angular/core';
import { UsefulLink } from '../classes/UsefulLink';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(private http: HttpClient) { }

  public GetUsefulLinks() : Observable<UsefulLink[]>
  {
    const endpoint: string = 'https://localhost:44390/api/Information/links';

    return this.http.get<UsefulLink[]>(endpoint);
  }

  public DeleteUsefulLinks(id: number)
  {
    const endpoint: string = 'https://localhost:44390/api/Information/deletelink/';
    return this.http.delete(endpoint+`${id}`);
  }

  public PostUsefulLinks(data)
  {
    const endpoint: string = 'https://localhost:44390/api/Information/postlink';
    return this.http.post(endpoint,data);
  }

}
