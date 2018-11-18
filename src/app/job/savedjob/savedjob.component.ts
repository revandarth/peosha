import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
//import {timeAgo} from 'time-ago-pipe';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-savedjob',
  templateUrl: './savedjob.component.html',
  styleUrls: ['./savedjob.component.css','./../pjobs/pjobs.component.css'],
  //pipes: [timeAgo],
})
export class SavedjobComponent implements OnInit {
  constructor(private _userService:UserService,private http:HttpClient,public snackBar: MatSnackBar,public router:Router) { }
  public user = this._userService.currentUser();
  public userId = this.user._id;
  getjobs = [];
  private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  ngOnInit() {
    this.getjoblist();
  }
  getjoblist(){
    let url = `http://localhost:3000/user/${this.userId}/savejob`;
    this.http
      .get(url,this.headers)
      .subscribe((res:any) => {
         if(res != undefined && !res.err)
            this.getjobs  = res.jobs.saved_jobs;
      }, () => {
          console.log('error');
      });
  }
}
