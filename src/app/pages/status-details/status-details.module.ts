import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusDetailsComponent } from './status-details/status-details.component';
import { TicketService} from "../../shared/services/ticket.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    AgGridModule
  ],
  declarations: [StatusDetailsComponent],
  providers: [
    TicketService
  ]
})
export class StatusDetailsModule { }
