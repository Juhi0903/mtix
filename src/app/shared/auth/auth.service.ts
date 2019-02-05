import { Router,ActivatedRoute } from '@angular/router';
import { Injectable ,Inject } from '@angular/core';
import { urls } from '../../app.config';
import { SESSION_STORAGE, StorageService , LOCAL_STORAGE } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';





@Injectable()
export class AuthService {
  // token: string;

  constructor(private router: Router,@Inject(LOCAL_STORAGE) private storage: StorageService,private cookieService: CookieService,private route: ActivatedRoute) {}

  getToken() {
    return this.cookieService.check("MTIX");
  }
  logout() {
    this.storage.remove('token');
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    const token = this.cookieService.check("MTIX");
    // console.log(token)    
    if(token==true)
      return true;
    else
    return false;
   
  }
}