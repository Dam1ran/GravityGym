import { Component, OnInit } from '@angular/core';
import { CabinetService } from '../Services/cabinet.service';
import { ClientDTO } from '../classes/ClientDTO';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {

  public clients: ClientDTO[];

  constructor(private cabinetService: CabinetService) { }

  ngOnInit() {
    this.cabinetService.GetMyClients()
    .subscribe
    (
      res=>{this.clients = res;}
    )
  }

}
