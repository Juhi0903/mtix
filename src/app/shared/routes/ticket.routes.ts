import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const Ticket_ROUTES: Routes = [
  {
    path: 'ticket',
    loadChildren: './pages/ticket/ticket-page.module#TicketPageModule'
  }
];