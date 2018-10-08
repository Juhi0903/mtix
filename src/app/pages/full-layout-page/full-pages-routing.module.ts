import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutPageComponent } from 'app/pages/full-layout-page/full-layout-page.component';
import { CreateTicketComponent } from '../../pages/full-layout-page/create-ticket/create-ticket.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';

const routes: Routes = [
  {
    path: 'full-layout',
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
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
