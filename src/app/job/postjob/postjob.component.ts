import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService } from './../../services/user/user.service';
@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {
   public postJob: FormGroup;
   public user = this._userService.currentUser();
   public userId = this.user._id;
   public separatorKeysCodes = [ENTER, COMMA];
   public employers = [];
   public employmentType = [{id:1,label:"Full Time"},{id:2,label:"Part Time"},{id:3,label:"Contract"},{id:4,label:"Volunteer"},{id:5,label:"Intership"}];
   public seniorLevel = [{id:1,label:"Intership"},{id:2,label:"Entry level"},{id:3,label:"Associate"},{id:4,label:"Mid-Senior level"},{id:5,label:"Director"},{id:6,label:"Executive"}]
   private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private _formbuilder:FormBuilder,private _userService:UserService,private http:HttpClient,public router: Router) { }
  ngOnInit() {
    this.postJob = this._formbuilder.group({
      org_id:['',[Validators.required]],
      designation:['',[Validators.required]],
      teamname:['',[Validators.required]],
      skills: ['',[Validators.required]],
      employment_type:['',[Validators.required]],
      experience:['',[Validators.required]],
      location:['',[Validators.required]],
      notify_type:[false,[]],
      notify_url:['',[]],
      notify_email:[this.user.email,[Validators.email]],
      description:['',[Validators.required]]
    })
    this.getCompany();
  }
  createJob = function(){
    if(this.postJob.valid){
      let url = `http://localhost:3000/user/${this.userId}/job`;
      let body = this.postJob.value;
      body.email = (this.postJob.value.notify_type)?body.notify_email:"";
      body.url = (this.postJob.value.notify_type)?body.notify_url:"";
      body.org_id = this.postJob.value.org_id.org_id;
      this.http
        .post(url,body,this.headers)
        .subscribe((res:any) => {
          if(res != undefined && !res.err)
              this.router.navigate(['/auth/jobs/user']);
        },(err) => {
            console.log(JSON.stringify(err.json()));
        });
    }
  }
  getCompany = function(){
    let url = `http://localhost:3000/user/${this.userId}/company`;
    this.http
      .get(url,this.headers)
      .subscribe((res:any) => {
        if(res != undefined && !res.err)
        this.employers = res.employers;
      },(err) => {
          console.log(JSON.stringify(err.json()));
      });
  }
  getDisplayFn = function(emp){
    return emp.name;
  }
  getErrorMessage(){
    return this.postJob.value.notify_email != "" ? this.postJob.controls['notify_email'].hasError('email') ? 'Not a valid email' :'' :'';
  }
}
