import { Component, OnInit } from '@angular/core';
import { ClientDTO } from '../classes/ClientDTO';
import { CoachService } from '../Services/coach.service';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {

  public clients: ClientDTO[];

  constructor(private coachService: CoachService) { }

  ngOnInit() {
    this.coachService.GetMyClients()
    .subscribe(
      res=>{this.clients = res;}
    )
  };
  
}
