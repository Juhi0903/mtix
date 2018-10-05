import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FullPagesRoutingModule } from "./full-pages-routing.module";

import { FullLayoutPageComponent } from './full-layout-page.component';
import { CreateTicketComponent } from 'app/pages/full-layout-page/create-ticket/create-ticket.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';

;


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullPagesRoutingModule
  ],
    entryComponents: [
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    declarations: [       
        FullLayoutPageComponent,
        CreateTicketComponent,
        AllTicketsComponent
    ]
})
export class FullPagesModule { }
