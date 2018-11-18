import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService }     from './../services/user/user.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public addOrg: FormGroup;
  public updateOrg: FormGroup;
  public user = this._userService.currentUser();
  public userId = this.user._id;
  private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public orgData = null;
  public employees:any = [{id:0,name:"0-1 employees"},
                          {id:2,name:"11-50 employees"},
                          {id:11,name:"51-200 employees"},
                          {id:201,name:"201-500 employees"},
                          {id:501,name:"501-1,000 employees"},
                          {id:1001,name:"1,001-5,000 employees"},
                          {id:5001,name:"5,001-10,000 employees"},
                          {id:10001,name:"10,001+ employees"}];
   public orgtype:any = [{id:0,name:"Public Company"},
                           {id:2,name:"Educational Institution"},
                           {id:11,name:"Self-Employed"},
                           {id:201,name:"Government Agency"},
                           {id:501,name:"Nonprofit"},
                           {id:1001,name:"Sole Proprietorship"},
                           {id:5001,name:"Privately Held"},
                           {id:10001,name:"Partnership"}];

  constructor(private _formbuilder:FormBuilder,private _userService:UserService,private http:HttpClient) { }
  ngOnInit() {
      this.getCompany();
      this.updateOrg = this._formbuilder.group({
        website:['',[Validators.required]],
        size:['',[Validators.required]],
        industry: ['',[Validators.required]],
        founded:['',[Validators.required]],
        companytype:['',[Validators.required]],
        headquarters:['',[Validators.required]],
        description:['',[Validators.required]]
      })
  }

  getCompany(){
    let url = `http://localhost:3000/user/${this.userId}/company`;
    this.http.get(url)
      .subscribe((x:any) => {
        if(!x.err && x.data){
          this.orgData = x.data
        }
      });
  }
  updateCompany(){
    if(this.updateOrg.valid){
      let url = 'http://localhost:3000/api/updateCompany'
      let body = this.updateOrg.value;
      body.orgid = 0;
      this.http
        .post(url,body,this.headers)
        .subscribe((res:any) => {
          if(res != undefined && !res.err){
              const data = res.data;
          }
        },(err) =>  {
            console.log(JSON.stringify(err.json()));
        });
    }
  }
}
