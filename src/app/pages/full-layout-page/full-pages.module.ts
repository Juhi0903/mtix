import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { AgGridModule } from 'ag-grid-angular';
import { FullPagesRoutingModule } from "./full-pages-routing.module";

import { FullLayoutPageComponent } from './full-layout-page.component';
import { CreateTicketComponent } from 'app/pages/full-layout-page/create-ticket/create-ticket.component';
import { AllTicketsComponent,EditStatus, EditPriority, EditAssignTo, EditAndViewDetails} from './all-tickets/all-tickets.component';
import { TicketService} from "../../shared/services/ticket.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {PriorityModule } from '../priority/priority.module';
import {AssignedModule} from '../assigned/assigned.module';
import {StatusModule} from '../status/status.module';
import {PriorityComponent } from '../priority/priority/priority.component';
import {AssignedComponent} from '../assigned/assigned/assigned.component';
import {StatusComponent} from '../status/status/status.component';
import { TicketDetailsComponent} from '../ticket-details/ticket-details/ticket-details.component';
import { TicketDetailsModule} from '../ticket-details/ticket-details.module';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullPagesRoutingModule,
    HttpModule,
    HttpClientModule,
    AgGridModule.withComponents([EditStatus, EditPriority, EditAssignTo, EditAndViewDetails]),
    StatusModule,
    AssignedModule,
    PriorityModule,
    NgbModule,
    TicketDetailsModule
  ],
    entryComponents: [
      PriorityComponent,
      AssignedComponent,
      StatusComponent,
      TicketDetailsComponent

    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    declarations: [       
        FullLayoutPageComponent,
        CreateTicketComponent,
        AllTicketsComponent,
        EditStatus,
        EditPriority,
        EditAssignTo,
        EditAndViewDetails
    ],
    providers: [
      TicketService
    ]
})
export class FullPagesModule { }
