import { Router } from '@angular/router';
import { Injectable ,Inject } from '@angular/core';
import { urls } from '../../app.config';
import { SESSION_STORAGE, StorageService , LOCAL_STORAGE } from 'angular-webstorage-service';



@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router,@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  getToken() {
    return this.storage.get("token");
  }
  logout() {
    this.storage.remove('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    const token = this.storage.get('token');
    if(token===null)
      return false;
    else
    return true;
   
  }
}