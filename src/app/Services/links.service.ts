import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsefulLink } from '../classes/UsefulLink';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  linkEndpoint: string = "/api/Link/";

  constructor(private http: HttpClient) { }

  public GetUsefulLinks() : Observable<UsefulLink[]>
  {
    return this.http.get<UsefulLink[]>(this.linkEndpoint);
  }

  public DeleteUsefulLinks(id: number)
  {
    return this.http.delete(this.linkEndpoint+`/${id}`);
  }

  public PostUsefulLinks(data)
  {
    return this.http.post(this.linkEndpoint,data);
  }

}
