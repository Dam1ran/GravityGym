import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OurTeamMember } from '../classes/OurTeamMember';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  memberEndpoint: string = "/api/Member/";

  constructor(private http: HttpClient) { }

  public SubmitOurTeamMember(avatarToUpload: File,imageToUpload: File,inputs: OurTeamMember)
  {    
    const formData: FormData = new FormData();
    formData.append('avatarFile', avatarToUpload, avatarToUpload.name);
    formData.append('imageFile', imageToUpload, imageToUpload.name);

    formData.append('fullName', inputs.fullName);
    formData.append('activity', inputs.activity);
    formData.append('description', inputs.description);
    formData.append('moto', inputs.moto);

    return this.http.post(this.memberEndpoint,formData);
  }

  public GetTeamMembers() : Observable<OurTeamMember[]>
  {
    return this.http.get<OurTeamMember[]>(this.memberEndpoint);
  }
  
  public DeleteTeamMember(id: number)
  {    
    return this.http.delete(this.memberEndpoint+`/${id}`);
  }

}
