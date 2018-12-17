
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import {BrowserModule} from '@angular/platform-browser';
import {ToastModule} from 'ng6-toastr/ng2-toastr';
import {ToasterService} from "./shared/services/toaster.service";
import { TicketService} from "./shared/services/ticket.service";
import { CookieService } from 'ngx-cookie-service';




@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        NgbModule.forRoot(),
        HttpModule,
        ToastModule.forRoot(),
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        ToasterService,
        TicketService,
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }