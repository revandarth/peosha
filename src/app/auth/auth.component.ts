import { Component, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']

})
export class AuthComponent implements OnInit{
  username:string;
  cookiesname:ICookies;
	constructor(private cookieService:CookieService) { }
	ngOnInit() {
    // this.cookiesname = JSON.parse(this.cookieService.get('p_d'));
    // this.username = this.cookiesname.e;
	}
}

export interface ICookies{
  token:string,
  e:string
}
