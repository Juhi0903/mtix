import { Component, OnInit , Inject} from '@angular/core';
import { TicketService} from "../../shared/services/ticket.service";
import { SESSION_STORAGE, StorageService ,LOCAL_STORAGE  } from 'angular-webstorage-service';
import { ActivatedRoute ,Router , Params } from '@angular/router';
import {urls,techLeads} from '../../app.config';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-content-layout-page',
  templateUrl: './content-layout-page.component.html',
  styleUrls: ['./content-layout-page.component.scss']
})
export class ContentLayoutPageComponent {

  show : any = false;
 
  constructor(private _ticketService : TicketService,
    @Inject(LOCAL_STORAGE) private storage: StorageService, 
    private route: ActivatedRoute,private router: Router,
    private cookieService: CookieService){
    let token = this.storage.get("token");
    let encodedToken = this.cookieService.check("MTIX");
    // console.log(token);
    
    if(token===null || encodedToken == false ) 
      this.show = true;
    else
      this.router.navigate([ '/' +  urls.dashboard], { relativeTo: this.route.parent });
  }

  login(){
    window.location.href = 'http://43.231.124.147:8080/v1/user/';
    // window.location.href = 'http://localhost:3000/v1/user/auth?token=hbjnkm'
  }

}
