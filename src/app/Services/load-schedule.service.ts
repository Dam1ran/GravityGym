import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http'
import { WeekDay } from '@angular/common';
import { IDaySchedule } from 'src/app/classes/DaySchedule'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadScheduleService {

  constructor(private http: HttpClient) { }

  GetSchedule(dayOfWeek: WeekDay) : Observable<IDaySchedule[]>
  {
    const endpoint: string = 'https://localhost:44390/api/Schedule';
    
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    
    let params1 = new HttpParams().set('dayOfWeek',dayOfWeek.toString());

    return this.http.get<IDaySchedule[]>(endpoint,{ headers: headers, params: params1 });

  }


}
