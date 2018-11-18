import { Component, OnInit } from '@angular/core';
import { UserService }     from './../services/user/user.service';
@Component({
  selector: 'app-jobs',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobsComponent implements OnInit {
  constructor(private _userService:UserService) { }
  public user = this._userService.currentUser();
  public userId = this.user._id;
  events = [];
  opened:boolean = true;
  ngOnInit() {
  }
}
