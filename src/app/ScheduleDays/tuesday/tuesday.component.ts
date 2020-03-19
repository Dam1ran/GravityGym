import { Component, OnInit } from '@angular/core';
import { UploadImageService } from 'src/app/Shared/upload-image.service'
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-tuesday',
  templateUrl: './tuesday.component.html',
  styleUrls: ['./tuesday.component.scss']
})
export class TuesdayComponent implements OnInit {

  constructor(private filesService: UploadImageService) { }

  ngOnInit() {
  }


  upload(files: FileList) {

    const file = files.item(0);
  
    this.filesService.postFile(WeekDay.Thursday,file).subscribe(
      res => console.log("zbs", JSON.stringify(res)),
      error => console.log("nu zbs")
    );
  }

}
