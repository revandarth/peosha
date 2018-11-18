import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {ENTER, COMMA} from '@angular/cdk/keycodes';
//import { UserService }     from './../services/user/user.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-add-certification',
  templateUrl: './add-certification.component.html',
  styleUrls: ['./../dashboard.component.css'],
  providers: []
})
export class AddCertificationComponent implements OnInit {
  constructor(public certModal: MatDialogRef<AddCertificationComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private http:HttpClient,public fb:FormBuilder) { }
  headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  // public user = _userService.currentUser();
  // public userId = this.user._id;
  addCer:FormGroup;
  certificate = null;
  isEdit = false;
  ngOnInit() {
    this.isEdit = (Object.keys(this.data.cer).length === 0 && this.data.cer.constructor === Object)?false:true;
    this.certificate = this.data.cer;
    this.addCer = this.fb.group({
       certification_name:[this.certificate.certification_name || '',[Validators.required]],
       authority:[this.certificate.authority || '',[Validators.required]],
       license_number: [this.certificate.license_number || '',[Validators.required]],
       start_year:[this.certificate.start_year || '',[Validators.required]],
       end_year:[this.certificate.end_year || '',[Validators.required]],
       certification_url:[this.certificate.certification_url || '',[]],//Validators.required
       certification_expire:[this.certificate.certification_expire || false]
    })
  }
  updCertification() {
    if(this.addCer.valid){
      let body = this.addCer.value;
      if(!this.isEdit){
        let url = `http://localhost:3000/user/${this.data.uid}/certificate`;
        this.http.post(url,body,this.headers)
        .subscribe((res:any) => {
            if(!res.err && res.certification != null){
                res.certification.edit = false;
                this.certModal.close(res.certification);
            }
        }, (error) => {
            console.log(error);
        });
      }else{
          let url1 = `http://localhost:3000/user/${this.data.uid}/certificate/${this.data.cer._id}`;
          this.http.put(url1,body,this.headers)
          .subscribe((res:any) => {
              if(!res.err && res.certification != null){
                res.certification.edit = true;
                this.certModal.close(res.certification);
              }
          }, (error) => {
              console.log(error);
          });
      }
    }
  }
  onCancel() {
    this.certModal.close(false);
  }

}
