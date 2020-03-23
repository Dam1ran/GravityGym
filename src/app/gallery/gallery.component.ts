import { Component, OnInit } from '@angular/core';
import { Fader } from '../Shared/fader';
import { InformationService } from '../Services/information.service';
import { GalleryImagesDTO } from '../classes/GalleryImagesDTO';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent extends Fader implements OnInit {

  public galleryImagesDTO: GalleryImagesDTO;
  loaded: boolean;
  next: boolean;
  previous: boolean;

  constructor(
    private infoService: InformationService,
    public dialog: MatDialog
  ) { super() }

  ngOnInit() {
    this.fade();

    this.Refresh("first");    
  }

  Refresh(nav){
    this.infoService.GetGalleryUrls(nav)
    .subscribe(res=>
    {      
      this.galleryImagesDTO = res;
      this.loaded = true;

      this.next = this.galleryImagesDTO.next!=null?true:false;
      this.previous = this.galleryImagesDTO.previous!=null?true:false;     
      
    });
  };

  nextPage(){
    this.loaded = false;    
    this.Refresh(this.galleryImagesDTO.next);
  }

  previousPage(){
    this.loaded = false;
    this.Refresh(this.galleryImagesDTO.previous);
  }
    
}
