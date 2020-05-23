import { Injectable } from '@angular/core';
import { DaySchedule } from '../classes/DaySchedule';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  scheduleEndpoint: string = "/api/Schedule/";

  constructor(private http: HttpClient) { }

  public SubmitSchedule(file: File,inputs: DaySchedule)
  {    
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('dayOfWeek', inputs.dayOfWeek);
    formData.append('practice', inputs.Practice);
    formData.append('description', inputs.description);
    formData.append('hourMinute', inputs.Time);

    return this.http.post(this.scheduleEndpoint,formData);
  }

  public GetScheduleForDay(weekDay) : Observable<DaySchedule[]>
  {
    const endpoint: string = this.scheduleEndpoint+'scheduleforday';

    return this.http.get<DaySchedule[]>(endpoint+`/${weekDay}`);
  }

  public DeleteSchedule(id: number)
  {    
    return this.http.delete(this.scheduleEndpoint+`/${id}`);
  }
}
