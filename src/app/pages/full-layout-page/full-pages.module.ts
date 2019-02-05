import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { AgGridModule } from 'ag-grid-angular';
import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { FullLayoutPageComponent } from './full-layout-page.component';
// import { CreateTicketComponent } from 'app/pages/full-layout-page/create-ticket/create-ticket.component';
// import { AllTicketsComponent, EditPriority, EditAssignTo, EditAndViewDetails, CreateSubTicket} from './all-tickets/all-tickets.component';
import { TicketService} from "../../shared/services/ticket.service";
import { ToasterService } from "../../shared/services/toaster.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {PriorityModule } from '../priority/priority.module';
import {AssignedModule} from '../assigned/assigned.module';
import {StatusModule} from '../status/status.module';
import {PriorityComponent } from '../priority/priority/priority.component';
import {AssignedComponent} from '../assigned/assigned/assigned.component';
import {StatusComponent} from '../status/status/status.component';
import { TicketDetailsComponent} from '../ticket-details/ticket-details/ticket-details.component';
import { TicketDetailsModule} from '../ticket-details/ticket-details.module';
import { StorageServiceModule } from 'angular-webstorage-service';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';
// import {StatusDetailsModule} from '../status-details/status-details.module';
// import {StatusDetailsComponent } from '../status-details/status-details/status-details.component';
import { CookieService } from 'ngx-cookie-service';

 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullPagesRoutingModule,
    HttpModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    StatusModule,
    AssignedModule,
    PriorityModule,
    NgbModule,
    TicketDetailsModule,
    StorageServiceModule,
    NgxChartsModule
    
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
        // CreateTicketComponent,
        // AllTicketsComponent,
        // EditPriority,
        // EditAssignTo,
        // EditAndViewDetails,
        // CreateSubTicket,
    ],
    providers: [
      TicketService,
      ToasterService,
      CookieService
    ]
})
export class FullPagesModule { }
