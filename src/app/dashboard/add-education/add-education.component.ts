import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent } from '@angular/material';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import {ENTER, COMMA} from '@angular/cdk/keycodes';
//import { CookieService } from 'angular2-cookie/services/cookies.service';
//import { UserService }     from './../services/user/user.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';
@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./../dashboard.component.css']
})
export class AddEducationComponent implements OnInit {
  constructor(public eduModal: MatDialogRef<AddEducationComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private http:HttpClient,public fb:FormBuilder,
  ng2FileInputService: Ng2FileInputService) { }
  fileName:any = '';
  isEdit:boolean = false;
  addEdu:FormGroup;
  ngOnInit() {
    this.isEdit = (Object.keys(this.data.edu).length === 0 && this.data.edu.constructor === Object)?false:true;
    this.addEdu = this.fb.group({
       institution_name:[this.data.edu.institution_name || '',[Validators.required]],
       degree:[this.data.edu.degree || '',[Validators.required]],
       major: [this.data.edu.major || '',[Validators.required]],
       start_year:[this.data.edu.start_year || '',[Validators.required]],
       end_year:[this.data.edu.end_year || '',[Validators.required]],
       gpa:[this.data.edu.gpa || '',[Validators.required]],
       verifed:[this.data.edu.verifed || false],//,[Validators.pattern('true')]
       document:[this.data.edu.document || ''],
       description:[this.data.edu.description || ''],
       reference:[this.data.edu.reference || '']
    })
  }
  public onAction(event: any){
   this.fileName = event.currentFiles;
 }
 // public onAdded(event: any){
 //   this.actionLog += "\n FileInput: "+event.id;
 //   this.actionLog += "\n Action: File added";
 // }
 // public onRemoved(event: any){
 //   this.actionLog += "\n FileInput: "+event.id;
 //   this.actionLog += "\n Action: File removed";
 // }
 // public onInvalidDenied(event: any){
 //   this.actionLog += "\n FileInput: "+event.id;
 //   this.actionLog += "\n Action: File denied";
 // }
 // public onCouldNotRemove(event: any){
 //   this.actionLog += "\n FileInput: "+event.id;
 //   this.actionLog += "\n Action: Could not remove file";
 // }
 // public resetFileInput():void{
 //   this.ng2FileInputService.reset(this.SupportedDcouments);
 // }
 //public logCurrentFiles():void{
   //let files = this.ng2FileInputService.getCurrentFiles(this.myFileInputIdentifier);
  // this.actionLog += "\n The currently added files are: " + this.getFileNames(files);
 //}
 private getFileNames(files:File[]):string{
   let names= files.map(file => file.name);
   return names ? names.join(", "): "No files currently added.";
 }
  redirect(data){
     this.eduModal.close(data.upload);
  }
  uploadDocument(res,file){
    let formData: FormData = new FormData();
    formData.append('document',file,file.name);
    let url = `http://localhost:3000/user/${this.data.uid}/${res.education._id}/uploadeducation`;
      // let headers = new Headers();
      // /** No need to include Content-Type in Angular 4 */
      // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');
      // let options = { headers: headers }
      //options
      //.map((x:any) => x)
      this.http.put(url,formData).subscribe((data:any) => {
          data.education[0].edit = res.education.edit;
          this.eduModal.close(data.education[0]);
        },
        error => console.log(error)
      )
  }

  updEducation() {
    if(this.addEdu.valid){
      let body = this.addEdu.value;
      let file: File = this.fileName[0];
      if(!this.isEdit){
          let url = `http://localhost:3000/user/${this.data.uid}/education`;
          this.http.post(url,body)
          .subscribe((res:any) => {
              if(!res.err && res.education != null){
                res.education.edit = false;
                  if(file)
                    this.uploadDocument(res,file)
                  else
                    this.eduModal.close(res.education);
              }
          }, () => {
              console.log('error');
          });
      }else{
        let url1 = `http://localhost:3000/user/${this.data.uid}/education/${this.data.edu._id}`;
          this.http.put(url1,body)
          .subscribe((res:any) => {
              if(!res.err && res.education != null){
                res.education.edit = true;
                  if(file)
                    this.uploadDocument(res,file)
                  else
                    this.eduModal.close(res.education);
              }
          },() => {
              console.log('error');
          });
      }
    }
  }
  onCancel() {
    this.eduModal.close(false);
  }
}
