import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class UserService {
  constructor(private cookie:CookieService) { }
  currentUser() {
    var data = this.cookie.get('p_d');
    var raw:any = (data)?JSON.parse(data):null;
    return raw;
  }
  getUserId() {
    var data = this.cookie.get('p_d');
    var raw:any = (data)?JSON.parse(data):null;
    return raw._id;
  }
}
