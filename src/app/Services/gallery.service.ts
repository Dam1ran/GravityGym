import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GalleryImagesDTO } from '../classes/GalleryImagesDTO';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  galleryEndpoint: string = "/api/Gallery/";

  constructor(private http: HttpClient) { }

  public GetGalleryUrls(navigation) : Observable<GalleryImagesDTO>
  {
    const formData: FormData = new FormData();
    formData.append('navigation', navigation);
    return this.http.post<GalleryImagesDTO>(this.galleryEndpoint,formData);
  }

}
