import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService }  from './../services/http.service';
import { UserService } from './../services/user/user.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public addOrg: FormGroup;
  public userId = this._userService.getUserId();
  public error = {err:false,errText:""};
  constructor(private _formbuilder:FormBuilder,private _userService:UserService,private httpService:HttpService,public router:Router) { }
  ngOnInit() {
    this.addOrg = this._formbuilder.group({
      name:['',[Validators.required]],
      agreed:[false,[Validators.pattern('true')]]
    })
  }

  addCompany = function(){
      if(this.addOrg.valid){
        let body = this.addOrg.value;
        body.owner_id = this.userId;
        this.httpService.postData(`http://localhost:3000/user/${this.userId}/company`,body)
         .subscribe((res:any) => {
            if(res != undefined && !res.err){
                const data = res.company;
                this.router.navigate(['/auth/company/admin',{id:data.org_id}]);
            }else{
                this.error.err = res.err;
                this.error.errText = res.errText[0].msg;
            }
          },() => {
              console.log('err');
          });
      }
    }
}
