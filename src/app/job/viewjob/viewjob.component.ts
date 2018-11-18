import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA,MatSnackBar } from '@angular/material';
//import {timeAgo} from 'time-ago-pipe';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService }  from './../../services/user/user.service';
import { HttpService }  from './../../services/http.service';
import { EasyapplyComponent } from './../easyapply/easyapply.component';
@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.css'],
  //pipes: [timeAgo]
})
export class ViewjobComponent implements OnInit {
  constructor(private _userService:UserService,private httpService:HttpService,
  public dialog: MatDialog,public route:ActivatedRoute,public snackBar: MatSnackBar) { }
  userId = this._userService.getUserId();
  job_info = null;
  id:string;
  public employmentType = {
        "1":"Full Time",
        "2":"Part Time",
        "3":"Contract",
        "4":"Volunteer",
        "5":"Intership"
      };
  public seniorLevel = {
      "1":"Intership",
      "2":"Entry level",
      "3":"Associate",
      "4":"Mid-Senior level",
      "5":"Director",
      "6":"Executive"
    }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.viewjob(this.id);
  }
  viewjob(id:string){
    this.httpService.getData(`http://localhost:3000/user/${this.userId}/job/${id}`)
      .subscribe((res:any) =>{
         if(res != undefined && !res.err){
           this.job_info  = res.jobs.map(a => {
             var is_saved = (a.saved_jobs.indexOf(this.userId.toString()) == -1)?false:true;
             a.is_saved = is_saved;
             return a;
           })
          this.job_info = res.jobs[0];
         }
      }, error => {
          console.log(JSON.stringify(error.json()));
      });
  }
  easyApply = function(){
    let dialogRef = this.dialog.open(EasyapplyComponent, {
      width: '40%',
      data:{ job_info:this.job_info  || { }, uid:this.userId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.showmsg('You have successfully applied to this job','Close');
        this.job_info.applied = true;
       }
      //  else{
      //    this.snackBar.open('Something went wrong','Close');
      // }
    });
  }
  showmsg(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  savejob(e,job){
    event.stopPropagation();
    if(job.is_saved)
    return;
    var body = {jobId:job._id};
    this.httpService.postData(`http://localhost:3000/user/${this.userId}/savejob`,body)
      .subscribe((res:any) => {
         if(res && !res.err &&  res.saved_jobs &&  res.saved_jobs.length > 0){
           job.is_saved = res.saved_jobs.indexOf(job._id) == -1 ?false:true;
           this.showmsg('Job saved successfully', 'Close');
         }
      },(error) => {
          console.log(JSON.stringify(error.json()));
      });
  }
}
