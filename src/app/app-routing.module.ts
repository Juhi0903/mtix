import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
// import { AuthGuard } from './shared/auth/auth-guard.service';
import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";
import { AuthGuard } from './shared/auth/auth-guard.service';
import { AuthService } from './shared/auth/auth.service';
import {Ticket_ROUTES} from "./shared/routes/ticket.routes";




const appRoutes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentLayoutComponent,
    data: { title: 'content Views' },
    children: [
      {
        path: '',
        loadChildren: './pages/content-layout-page/content-pages.module#ContentPagesModule',
        canActivate: [AuthGuard]
      },
    ]
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
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthService,AuthGuard],
})

export class AppRoutingModule {

}
