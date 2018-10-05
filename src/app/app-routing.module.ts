import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';
import {Ticket_ROUTES} from "./shared/routes/ticket.routes";


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'full-layout',
    pathMatch: 'full',
  },
  { path: '',
   component: FullLayoutComponent,
    data: { title: 'full Views' },
    children:  [
      {
        path: '',
        loadChildren: './pages/full-layout-page/full-pages.module#FullPagesModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'ticket',
        loadChildren: './pages/ticket/ticket-page.module#TicketPageModule',
        canActivate: [AuthGuard]
      },
    ]
  },
  // { path: '', 
  //   component: ContentLayoutComponent, 
  //   data: { title: 'content Views'}, 
  //   children: CONTENT_ROUTES,
  //   canActivate: [AuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
