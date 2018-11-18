import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
//import {timeAgo} from 'time-ago-pipe';
import { Router} from '@angular/router';
import { UserService }  from './../../services/user/user.service';
import { HttpService }  from './../../services/http.service';
@Component({
  selector: 'app-jobsearch',
  templateUrl: './jobsearch.component.html',
  styleUrls: ['./jobsearch.component.css','./../pjobs/pjobs.component.css'],
  //pipes: [timeAgo],
})
export class JobsearchComponent implements OnInit {
  constructor(private _userService:UserService,private httpService:HttpService,public snackBar: MatSnackBar,public router:Router) { }
  userId = this._userService.getUserId();
  getjobs = [];
  ngOnInit() {
    this.getjoblist();
  }
  getjoblist(){
    this.httpService.getData(`http://localhost:3000/user/${this.userId}/job/all`)
      .subscribe((res:any) => {
         if(res != undefined && !res.err)
            this.getjobs  = res.jobs.map(a => {
              var is_saved = (a.saved_jobs && a.saved_jobs.indexOf(this.userId.toString()) == -1)?false:true;
              a.is_saved = is_saved;
              return a;
            })
      }, error => {
          console.log(JSON.stringify(error.json()));
      });
  }
  showmsg(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  showJob(id){
    alert(id)
    this.router.navigate(["auth/jobs/user/view",id]);
  }
  savejob(e,job){
    event.stopPropagation();
    if(job.is_saved)
    return;
    var body = {jobId:job._id};
    this.httpService.postData(`http://localhost:3000/user/${this.userId}/savejob`,body)
      .subscribe((res:any) => {
         if(res && !res.err){
           this.showmsg('job saved successfully', 'Delete');
           job.is_saved = true;
         }
      },() => {
          console.log('error');
      });
  }
}
