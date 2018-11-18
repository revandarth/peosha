import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent} from '@angular/material';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-user-bio',
  templateUrl: './user-bio.component.html',
  styleUrls: ['./../dashboard.component.css']
})
export class UserBioComponent implements OnInit {
  constructor(public bioModal: MatDialogRef<UserBioComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private http:HttpClient,public fb:FormBuilder) { }
  separatorKeysCodes = [ENTER, COMMA];
  public bio = null;
  private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  // public user = _userService.currentUser();
  // public userId = this.user._id;
  editIntro:FormGroup;
  ngOnInit() {
    this.bio = this.data.bio;
    this.editIntro = this.fb.group({
       firstname:[this.bio.firstname || '',[Validators.required]],
       lastname:[this.bio.lastname || '',[Validators.required]],
       headline: [this.bio.headline || '',[Validators.required]],
       education:[this.bio.education || '',[Validators.required]],
       country:[this.bio.country || '',[Validators.required]],
       state:[this.bio.state || '',[Validators.required]],
       city:[this.bio.city || '',[Validators.required]],
       summary:[this.bio.summary || '',[Validators.required]],
       current_designation:[this.bio.current_designation ||'',[Validators.required]]
    })
  }
  updateIntro = function(){
    alert(this.editIntro.valid)
    if(this.editIntro.valid){
       let url = 'http://localhost:3000/user/'+this.data.uid+'/bio';
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
