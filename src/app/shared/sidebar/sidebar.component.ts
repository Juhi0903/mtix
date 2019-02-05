import { Component, OnInit , Inject} from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { SESSION_STORAGE, StorageService ,LOCAL_STORAGE  } from 'angular-webstorage-service';
import {urls} from '../../app.config';
import { CookieService } from 'ngx-cookie-service';



declare var $: any;
@Component({
    // moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    // token : any;

    constructor(private router: Router,private route: ActivatedRoute,@Inject(LOCAL_STORAGE) private storage: StorageService,private cookieService : CookieService) { 
        // let token = this.cookieService.check("MTIX");
        // console.log(token);
        // if(token == false) 
        //  this.router.navigate([ '/login'], { relativeTo: this.route.parent });
        // else{
        $.getScript('./assets/js/app-sidebar.js');
        this.menuItems = ROUTES.filter(menuItem => menuItem); 
        // }
    }

    ngOnInit() {
        
    }

}
