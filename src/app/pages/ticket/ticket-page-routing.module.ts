import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTicketComponent } from './my-ticket/my-ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { TicketDetailsComponent} from '../ticket-details/ticket-details/ticket-details.component';
import { AuthGuard } from '../../shared/auth/auth-guard.service';
import { AuthService } from '../../shared/auth/auth.service';



const routes: Routes = [
  {
    path: 'personal',
    component: MyTicketComponent,
    data: { title: 'Ticket Page' },  
    canActivate: [AuthGuard]  
  },
  {
    path: 'pending',
    component: MyTicketComponent,
    data: { title: 'Ticket Page' }, 
    canActivate: [AuthGuard]   
  },
  {
    path: 'closed',
    component: MyTicketComponent,
    data: { title: 'Ticket Page' }, 
    canActivate: [AuthGuard]   
  },
  {
    path: 'createticket',
     component: CreateTicketComponent,
    data: {
      title: 'Create Ticket Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'ticket',
     component: AllTicketsComponent,
    data: {
      title: 'Ticket Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'subticket/:id',
    component: CreateTicketComponent,
    data: {
      title: 'Create Sub Ticket Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'ticketdetails/:id',
    component: TicketDetailsComponent,
    data: {
      title: 'Create Sub Ticket Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'subticket/details/:id',
    component: TicketDetailsComponent,
    data: {
      title: 'Create Sub Ticket Page'
    },
    canActivate: [AuthGuard]
  },

  {
    path: 'ticket/:status',
     component: AllTicketsComponent,
    data: {
      title: 'Ticket Page'
    },
    canActivate: [AuthGuard]
  },

  {
    path: 'ticket/:id/:status',
     component: AllTicketsComponent,
    data: {
      title: 'Ticket Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'raised/notupdated',
     component: AllTicketsComponent,
    data: {
      title: 'Ticket Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'issued/notupdated',
     component: AllTicketsComponent,
    data: {
      title: 'Ticket Page'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'raised/all',
    component: MyTicketComponent,
    data: { title: 'Ticket Page' }, 
    canActivate: [AuthGuard]   
  },
  {
    path: 'raised/working',
    component: MyTicketComponent,
    data: { title: 'Ticket Page' }, 
    canActivate: [AuthGuard]   
  },
  {
    path: 'raised/closed',
    component: MyTicketComponent,
    data: { title: 'Ticket Page' }, 
    canActivate: [AuthGuard]   
  },
  {
    path: 'review',
    component: MyTicketComponent,
    data: { title: 'Ticket Page' }, 
    canActivate: [AuthGuard]   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketPagesRoutingModule { }
