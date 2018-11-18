import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpService }  from './../../services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService }  from './../../services/user/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  constructor(public router:Router,private cookieService:CookieService,private httpService:HttpService,public _userService:UserService) { }
  userId = this._userService.getUserId();
  orgData = [];
  logout(){
    this.cookieService.deleteAll('/');
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
    this.getCompany();
  }
  getCompany = function(){
    let orgCookie = this.cookieService.get("_deorg");
    if(!orgCookie){
      this.httpService.getData(`http://localhost:3000/user/${this.userId}/company`)
        .subscribe((res:any) => {
          if(res != undefined && !res.err && res.employers != null && res.employers.length != 0){
            let data =  JSON.stringify({uid:this.userId,org:res.employers});
            this.orgData = res.employers;
            var date = new Date();
            date.setHours(date.getHours() + 1);
            this.cookieService.set('_deorg',data,date,'/');
          }
        },(err) => {
            console.log(JSON.stringify(err.json()));
        });
    }else{
        orgCookie = JSON.parse(orgCookie);
        if(orgCookie.uid == this.userId){
          this.orgData = orgCookie.org;
        }
    }
  }
}
