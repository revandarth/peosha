import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthService {
  constructor(public cookieService: CookieService) {}
  public isAuthenticated(): string {
    var str = this.cookieService.get('p_d') != 'undefined' && this.cookieService.get('p_d') ?JSON.parse(this.cookieService.get('p_d')):false;
    return str;
  }
}
