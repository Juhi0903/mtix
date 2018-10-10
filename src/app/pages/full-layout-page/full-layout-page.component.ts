import { Component , OnInit} from '@angular/core';
import { TicketService} from "../../shared/services/ticket.service";


@Component({
  selector: 'app-full-layout-page',
  templateUrl: './full-layout-page.component.html',
  styleUrls: ['./full-layout-page.component.scss']
})
export class FullLayoutPageComponent implements OnInit {

  constructor(private _ticketService : TicketService) { }

  ngOnInit() {
    this.login();
  }
  login = async() =>{
    await this._ticketService.login();
  }
}
