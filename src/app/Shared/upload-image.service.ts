import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { WeekDay } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http: HttpClient) { }

  postFile(caption: WeekDay, fileToUpload: File)
  {
    const imageUploadEndpoint = 'https://localhost:44390/api/Schedule';
    const formData: FormData = new FormData();
    formData.append('files',fileToUpload,fileToUpload.name);
    formData.append('dayOfWeek',caption.toString());    
    return this.http.post(imageUploadEndpoint,formData);
  }


}
