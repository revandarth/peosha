import { Component, OnInit } from '@angular/core';
import { HttpService }  from './../../services/http.service';
import { UserService } from './../../services/user/user.service';
@Component({
  selector: 'app-getjob',
  templateUrl: './getjob.component.html',
  styleUrls: ['./getjob.component.css']
})
export class GetjobComponent implements OnInit {
  constructor(private _userService:UserService,private httpService:HttpService) { }
  userId = this._userService.getUserId();
  getjobs = [];
  panelOpenState: boolean = false;
  ngOnInit() {
    this.getjoblist();
  }
  getjoblist(){
    let url = `http://localhost:3000/user/${this.userId}/job`;
    this.httpService.getData(url)
      .subscribe((res:any) => {
         if(res != undefined && !res.err)
           this.getjobs = res.jobs;
      }, error => {
          console.log(JSON.stringify(error.json()));
      });
  }
}
