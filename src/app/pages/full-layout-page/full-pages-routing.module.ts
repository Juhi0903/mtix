import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutPageComponent } from 'app/pages/full-layout-page/full-layout-page.component';
import { CreateTicketComponent } from '../../pages/full-layout-page/create-ticket/create-ticket.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { TicketDetailsComponent} from '../ticket-details/ticket-details/ticket-details.component';


const routes: Routes = [
  {
    path: 'dashboard',
     component: FullLayoutPageComponent,
    data: {
      title: 'Full Layout Page'
    },    
  },
  {
    path: 'createticket',
     component: CreateTicketComponent,
    data: {
      title: 'Create Ticket Page'
    },
  },
  {
    path: 'ticket',
     component: AllTicketsComponent,
    data: {
      title: 'Ticket Page'
    },
  },
  {
    path: 'subticket/:id',
    component: CreateTicketComponent,
    data: {
      title: 'Create Sub Ticket Page'
    },
  },
  {
    path: 'ticketdetails/:id',
    component: TicketDetailsComponent,
    data: {
      title: 'Create Sub Ticket Page'
    },
  },
  {
    path: 'subticket/details/:id',
    component: TicketDetailsComponent,
    data: {
      title: 'Create Sub Ticket Page'
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
