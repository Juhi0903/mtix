import { Component, AfterViewChecked , Inject} from '@angular/core';
import { SESSION_STORAGE, StorageService , LOCAL_STORAGE } from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements AfterViewChecked{

    toggleClass = 'ft-maximize';
    placement = 'bottom-right'
    public isCollapsed = true;

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) {
      
       }

    ngAfterViewChecked() {

        setTimeout(() => {
            var wrapperDiv = document.getElementsByClassName("wrapper")[0];
            var dir = wrapperDiv.getAttribute("dir");
            if (dir === 'rtl') {
                this.placement = 'bottom-left';
            }
            else if (dir === 'ltr') {
                this.placement = 'bottom-right';
            }
        }, 3000);


    }

    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        }
        else
            this.toggleClass = 'ft-maximize'
    }

    Logout(){
        this.storage.remove('token');
        this.storage.remove('LEAD');
        this.router.navigate(['/login']);
    }
}
