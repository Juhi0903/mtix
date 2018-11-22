import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketDetailsComponent , EditRemaks,DownloadFile} from './ticket-details/ticket-details.component';
import { TicketService} from "../../shared/services/ticket.service";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { AgGridModule } from 'ag-grid-angular';
// import {EditAssignTo} from '../full-layout-page/all-tickets/all-tickets.component';
import {FullPagesModule } from '../full-layout-page/full-pages.module';
// import {EditStatus} from '../ticket/my-ticket/my-ticket.component';
import { RouterModule, Routes } from '@angular/router';
import {TicketPageModule} from '../ticket/ticket-page.module';
import {AssignedModule} from '../assigned/assigned.module';
import {StatusModule} from '../status/status.module';
import {StatusComponent} from '../status/status/status.component';
import {AssignedComponent} from '../assigned/assigned/assigned.component';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([EditRemaks,DownloadFile]),
    AssignedModule,
    StatusModule,
    RouterModule,
    
    
   ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AssignedComponent, StatusComponent],
  declarations: [TicketDetailsComponent, EditRemaks,DownloadFile],
  providers: [
    TicketService
  ]
})
export class TicketDetailsModule { }
