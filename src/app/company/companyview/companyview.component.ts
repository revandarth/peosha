import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA , MatSnackBar} from '@angular/material';
import { HttpService }  from './../../services/http.service';
import { UserService } from './../../services/user/user.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-companyview',
  templateUrl: './companyview.component.html',
  styleUrls: ['./companyview.component.css','./../org-admin/org-admin.component.css','./../../styles/user.css']
})
export class CompanyviewComponent implements OnInit {
  userId = this._userService.getUserId();
  orgData = {};
  orgId:string;
  public employees:any = [
    {id:0,name:"0-1 employees"},
    {id:2,name:"11-50 employees"},
    {id:11,name:"51-200 employees"},
    {id:201,name:"201-500 employees"},
    {id:501,name:"501-1,000 employees"},
    {id:1001,name:"1,001-5,000 employees"},
    {id:5001,name:"5,001-10,000 employees"},
    {id:10001,name:"10,001+ employees"}];
   public orgtype:any = [
       {id:0,name:"Public Company"},
       {id:1,name:"Educational Institution"},
       {id:2,name:"Self-Employed"},
       {id:3,name:"Government Agency"},
       {id:4,name:"Non Profit"},
       {id:5,name:"Sole Proprietorship"},
       {id:6,name:"Privately Held"},
       {id:7,name:"Partnership"}
    ];
  constructor(public _userService:UserService,public fb:FormBuilder,public httpService:HttpService,private router:Router,private route:ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orgId = params.id;
    });
    this.getCompany();
  }
  getempText(id){
    var name = "";
    this.employees.forEach(eachObj => {
      if(eachObj.id == id){
          name = eachObj.name;
      }
    });
    return name;
  }
  orgtypeText(id){
    var name = "";
    this.orgtype.forEach(eachObj => {
      if(eachObj.id == id){
          name = eachObj.name;
      }
    });
    return name;
  }
  getCompany(){
    this.httpService.getData(`http://localhost:3000/user/${this.userId}/company/${this.orgId}`)
     .subscribe((res:any) => {
      if(!res.err)
        this.orgData = res.company;
    });
  }
}
