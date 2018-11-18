import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA,MatSelectModule} from '@angular/material';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-org-location',
  templateUrl: './org-location.component.html',
  styleUrls: ['./org-location.component.css'],
  providers: []
})
export class OrgLocationComponent implements OnInit {
  constructor(public thisLocation: MatDialogRef<OrgLocationComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private http:HttpClient,public fb:FormBuilder,private router:Router) { }
  private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public submitted:boolean = false;
  public edit:boolean =  false;
  addLoc:FormGroup;
  ngOnInit() {
    this.edit = (Object.keys(this.data.location).length != 0)?true:false;
    this.addLoc = this.fb.group({
      building_name: [this.data.location.building_name || '', [Validators.required,Validators.minLength(4)]],
      address1: [this.data.location.address1 || '', [Validators.required]],
      //address2 :[this.location.address2 || '',[Validators.required]],
      state :[this.data.location.state || '', [Validators.required]],
      head_quarters:[this.data.location.head_quarters  || false ,[]],
      country:[this.data.location.country || '',[Validators.required]],
      city:[this.data.location.city || '',[Validators.required]]
    })
  }
  addLocation() {
    if(this.addLoc.valid){
      let url = `http://localhost:3000/user/${this.data.uid}/company`
      //${this.state.params.id}/location`;
      if(!this.edit){
          this.http.post(url,this.addLoc.value,this.headers)
          .subscribe((res:any) => {
              if(!res.err && res.location != null)
                this.afterSuccess(res.location[0])
          }, (error) => {
              this.thisLocation.close('err');
          });
      }else{
          this.http.put(url,this.addLoc.value,this.headers)
          .subscribe((res:any) => {
              if(!res.err && res.location != null)
                this.afterSuccess(this.addLoc.value)
          }, (error) => {
              this.thisLocation.close('err');
          });
      }
    }
  }
  onCancel() {
    this.thisLocation.close(false);
  }
  afterSuccess(data){
      this.thisLocation.close(data);
  }

}
