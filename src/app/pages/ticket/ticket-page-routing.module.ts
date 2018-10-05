import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTicketComponent } from './my-ticket/my-ticket.component';


const routes: Routes = [
  {
    path: 'alltickets',
    component: MyTicketComponent,
    data: { title: 'Ticket Page' },    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketPagesRoutingModule { }
