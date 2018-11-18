import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
//import {timeAgo} from 'time-ago-pipe';
import { UserService }  from './../../services/user/user.service';
import { HttpService }  from './../../services/http.service';

@Component({
  selector: 'app-applied',
  templateUrl: './applied.component.html',
  styleUrls: ['./applied.component.css','./../pjobs/pjobs.component.css'],
//  pipes: [timeAgo],
})
export class AppliedComponent implements OnInit {
  constructor(private _userService:UserService,private httpService:HttpService,public snackBar: MatSnackBar,public router:Router) { }
  userId = this._userService.getUserId();
  getjobs = [];
  ngOnInit() {
    this.getjoblist();
  }
  getjoblist(){
    this.httpService.getData(`http://localhost:3000/user/${this.userId}/savejob`)
      .subscribe((res:any) => {
         if(res != undefined && !res.err)
            this.getjobs  = res.jobs.saved_jobs;
      }, () => {
          console.log('error');
      });
  }

}
