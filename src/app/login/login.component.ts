import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[CookieService]//HttpService
})
export class LoginComponent implements OnInit{
  login:FormGroup;
  registration:FormGroup;
  loading:boolean = false;
  constructor(private fb:FormBuilder,private http:HttpClient,private cookieService:CookieService,private router: Router,private route:ActivatedRoute) {
    this.registration = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      terms :[false,[Validators.pattern('true')]],
      password :['', [Validators.required]]
    });
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password :['', [Validators.required]]
    });
  }
  //  @Input() returnTo: TargetState;
    IsLogin: boolean = false;
    error:String = "";
    submitted:boolean = false;
    isError:boolean = false;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    regData:string;
    ngOnInit() {
      //console.log(this.cookieService.get('_de'))
      // if(this.cookieService.getObject('_de') != null)
      //   this.stateService.go('dashboard');
    }
  toggleLogin(){
    this.IsLogin = !this.IsLogin;
    this.isError = false;
  }
  errLog(res){
    this.loading = false;
    if(res.status == "400" && res.error.err){
        this.error = res.error.errText;
        this.isError = true;
      }
  }
  httpCall(url,body){
    this.http
    .post(url,body,this.headers)
    .subscribe((res:any) => {
        this.loading = false;
        if(res != undefined && !res.err && res.data != null){
            this.isError = false;
            let data =  JSON.stringify(res.data);
            var date = new Date();
            date.setHours(date.getHours() + 1);
            this.cookieService.set('p_d',data,date,'/');
            this.router.navigate(['/auth/dashboard']);
        }else if(res.err){
          this.error = res.errText;
          this.isError = true;
        }
    },res => this.errLog(res));
  };
  doRegistration(){
    this.submitted = true;
      if( this.registration.valid){
          this.loading = true;
          this.submitted = false;
          let url = environment.apiUrl +'user/signup';
          let body = this.registration.value;
          this.httpCall(url,body);
      }
  }
  doLogin(){
    this.submitted = true;
      if(this.login.valid){
          this.loading = true;
          this.submitted = false;
          let url =  environment.apiUrl +'user/signin';
          let body = this.login.value;
          this.httpCall(url,body);
      }
  }
}
