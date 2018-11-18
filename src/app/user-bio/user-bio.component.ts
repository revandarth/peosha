import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent} from '@angular/material';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { UserService }     from './../services/user/user.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-user-bio',
  templateUrl: './user-bio.component.html',
  styleUrls: ['./user-bio.component.css']
})
export class UserBioComponent implements OnInit {
  editIntro:FormGroup;
  constructor(public bioModal: MatDialogRef<UserBioComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private http:HttpClient,public _userService:UserService,public fb:FormBuilder) {}
  separatorKeysCodes = [ENTER, COMMA];
  private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public user = this._userService.currentUser();
  public userId = this.user._id;
  ngOnInit() {
    this.editIntro = this.fb.group({
       firstname:[this.data.firstname || '',[Validators.required]],
       lastname:[this.data.lastname || '',[Validators.required]],
       headline: [this.data.headline || '',[Validators.required]],
       education:[this.data.education || '',[Validators.required]],
       country:[this.data.country || '',[Validators.required]],
       state:[this.data.state || '',[Validators.required]],
       city:[this.data.city || '',[Validators.required]],
       summary:[this.data.summary || '',[Validators.required]],
       current_designation:[this.data.current_designation ||'',[Validators.required]]
    })
  }
  updateIntro = function(){
    if(this.editIntro.valid){
       let url = 'http://localhost:3000/user/'+this.userId+'/bio';
      let body = this.editIntro.value;
      body.userid = this.userId;
      this.http
        .put(url,body,this.headers)
        .subscribe(res => {
          if(res != undefined && !res.err){
              this.bioModal.close(res.bio);
          }
        },(err) => {
            console.log(JSON.stringify(err.json()));
        });
    }
  }
  onCancel() {
    this.bioModal.close(false);
  }
}
