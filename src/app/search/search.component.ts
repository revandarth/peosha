import { Component, OnInit,Inject} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService } from './../services/user/user.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  constructor(private _userService:UserService,private http:HttpClient) { }
  public user = this._userService.currentUser();
  //public userId = this.user._id;
  public results = [];
  public headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  ngOnInit() {
    this.search()
  }

  search(){
    let url = `http://localhost:3000/user/${this.user._id}/all`;
    this.http.get(url,this.headers)
      .subscribe((res:any) => {
         if(!res.err && res.user && res.user.length > 0){
           this.results = res.user;
         }
      },() => {
          console.log('error');
      });
    }
}
