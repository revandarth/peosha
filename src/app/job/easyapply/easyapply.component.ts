import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import { HttpService }  from './../../services/http.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';
@Component({
  selector: 'app-easyapply',
  templateUrl: './easyapply.component.html',
  styleUrls: ['./easyapply.component.css']
})
export class EasyapplyComponent implements OnInit {
  easyForm: FormGroup;
  fileName = null;
  constructor(public easyApply: MatDialogRef<EasyapplyComponent>,public fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,private httpService:HttpService,private ng2FileInputService: Ng2FileInputService) {
      this.easyForm = this.fb.group({
         email:['',[Validators.required]],
         phone:['',[Validators.required]],
         document:['']
      });
   }
  ngOnInit() {}
  public onClose():void {
    this.easyApply.close();
  }
  public onAction(event: any){
   this.fileName = event.currentFiles;
 }
  applyjob(){
      if(this.easyForm.valid){
        let formData: FormData = new FormData();
        if(this.fileName != null){
          let file: File =  this.fileName[0];
          formData.append('document',file,file.name);
        }
        this.httpService.postData(`http://localhost:3000/user/${this.data.uid}/job/${this.data.job_info._id}/${this.easyForm.value.email}/${this.easyForm.value.phone}`,null)
          .subscribe((res:any) => {
            if(!res.err && res.data)
              this.easyApply.close(res.data);
            else
              this.easyApply.close(false);
        }, (error) => {
            this.easyApply.close(false);
        });
    }
  }
}
