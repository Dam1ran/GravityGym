import { Injectable } from '@angular/core';
import { UsefulLink } from '../classes/UsefulLink';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DaySchedule } from '../classes/DaySchedule';
import { OurTeamMember } from '../classes/OurTeamMember';
import { GalleryImagesDTO } from '../classes/GalleryImagesDTO';

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

  public SubmitSchedule(file: File,inputs: DaySchedule)
  {    
    const endpoint: string = 'https://localhost:44390/api/Information/postschedule';
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('dayOfWeek', inputs.dayOfWeek);
    formData.append('practice', inputs.Practice);
    formData.append('description', inputs.description);
    formData.append('hourMinute', inputs.Time);

    return this.http.post(endpoint,formData);
  }

  public GetScheduleForDay(weekDay) : Observable<DaySchedule[]>
  {
    const endpoint: string = 'https://localhost:44390/api/Information/scheduleforday';

    return this.http.get<DaySchedule[]>(endpoint+`/${weekDay}`);
  }

  public DeleteSchedule(id: number)
  {
    const endpoint: string = 'https://localhost:44390/api/Information/deleteSchedule/';
    return this.http.delete(endpoint+`${id}`);
  }

  public SubmitOurTeamMember(avatarToUpload: File,imageToUpload: File,inputs: OurTeamMember)
  {    
    const endpoint: string = 'https://localhost:44390/api/Information/postteammember';
    const formData: FormData = new FormData();
    formData.append('avatarFile', avatarToUpload, avatarToUpload.name);
    formData.append('imageFile', imageToUpload, imageToUpload.name);

    formData.append('fullName', inputs.fullName);
    formData.append('activity', inputs.activity);
    formData.append('description', inputs.description);
    formData.append('moto', inputs.moto);

    return this.http.post(endpoint,formData);
  }

  public GetTeamMembers() : Observable<OurTeamMember[]>
  {
    const endpoint: string = 'https://localhost:44390/api/Information/getteammembers';

    return this.http.get<OurTeamMember[]>(endpoint);
  }
  
  public DeleteTeamMember(id: number)
  {
    const endpoint: string = 'https://localhost:44390/api/Information/deleteteammember/';
    return this.http.delete(endpoint+`${id}`);
  }

  public GetGalleryUrls(navigation) : Observable<GalleryImagesDTO>
  {
    const endpoint: string = 'https://localhost:44390/api/Information/gallerypage';

    const formData: FormData = new FormData();
    formData.append('nav', navigation);
    return this.http.post<GalleryImagesDTO>(endpoint,formData);
  }


}
