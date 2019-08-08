import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyTicketComponent , EditStatus , EditAndViewDetails} from './my-ticket/my-ticket.component';
import { TicketPagesRoutingModule } from "./ticket-page-routing.module";
import { TicketService} from "../../shared/services/ticket.service";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
// import {StatusModule} from '../status/status.module';
// import {StatusComponent} from '../status/status/status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {TicketDetailsModule } from '../ticket-details/ticket-details.module';
// import {TicketDetailsComponent } from '../ticket-details/ticket-details/ticket-details.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { AllTicketsComponent, EditPriority, EditAssignTo, ViewDetails, CreateSubTicket} from './all-tickets/all-tickets.component';
// import { TicketDetailsComponent} from '../ticket-details/ticket-details/ticket-details.component';
import {PriorityModule } from '../priority/priority.module';
import {AssignedModule} from '../assigned/assigned.module';
import {StatusModule} from '../status/status.module';
import {PriorityComponent } from '../priority/priority/priority.component';
import {AssignedComponent} from '../assigned/assigned/assigned.component';
import {StatusComponent} from '../status/status/status.component';
import { TicketDetailsComponent} from '../ticket-details/ticket-details/ticket-details.component';
import { TicketDetailsModule} from '../ticket-details/ticket-details.module';
import { TicketV2Component,TicketDetails } from './ticket-v2/ticket-v2.component';



@NgModule({
  imports: [
    CommonModule,
    TicketPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([EditStatus, EditAndViewDetails,ViewDetails,EditAssignTo,EditPriority,CreateSubTicket,TicketDetails]),
    StorageServiceModule,
    StatusModule,
    NgbModule,
    TicketDetailsModule,
    AssignedModule,
    PriorityModule,
    NgbModule,
    AngularMultiSelectModule
  ],
  entryComponents: [
    // StatusComponent,
    // TicketDetailsComponent,
    PriorityComponent,
    AssignedComponent,
    StatusComponent,
    TicketDetailsComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MyTicketComponent,
    EditStatus,
    EditAndViewDetails,
    CreateTicketComponent,
    AllTicketsComponent,
    EditPriority,
    EditAssignTo,
    ViewDetails,
    CreateSubTicket,
    TicketV2Component,
    TicketDetails
    

  ],
  providers: [
    TicketService
  ]
})
export class TicketPageModule { }
