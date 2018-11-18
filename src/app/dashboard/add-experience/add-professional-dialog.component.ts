import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatSelectModule} from '@angular/material';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
//import { UserService }     from './../services/user/user.service';
import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';
@Component({
  selector: 'add-professional-component',
  templateUrl: './add-professional-dialog.component.html',
  styleUrls: ['./../dashboard.component.css']
})
export class AddProfessionalComponent{
  constructor(public thisExperience: MatDialogRef<AddProfessionalComponent>,@Inject(MAT_DIALOG_DATA) public modal: any,private http:HttpClient,public fb:FormBuilder,
    private ng2FileInputService: Ng2FileInputService) { }
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    public submitted:boolean = false;
    private fileName:object = null;
    public isEdit = false;
    public professional = null;
    addExp:FormGroup;
    public onAction(event: any){
     this.fileName = event.currentFiles;
     //console.log(this.fileName)
   }
   maxYear:number;
   minYear:number;
   months = [
      {id:1,value:"January"},
      {id:2,value:"February"},
      {id:3,value:"March"},
      {id:4,value:"April"},
      {id:5,value:"May"},
      {id:6,value:"June"},
      {id:7,value:"July"},
      {id:8,value:"August"},
      {id:9,value:"September"},
      {id:1,value:"October"},
      {id:11,value:"November"},
      {id:12,value:"December"}
    ];
    years = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,
      2002,2003,2004,2005,2006,2007,2008,2009,2010,2012,2013,2014,2015,
      2016,2017,2018];
    ngOnInit(){
        this.maxYear = this.years[this.years.length - 1];
        this.minYear = this.years[0];
        this.isEdit = (Object.keys(this.modal.data).length === 0 && this.modal.data.constructor === Object)?false:true;
        this.professional = this.modal.data;
        this.addExp = this.fb.group({
          title: [this.professional.title || '', [Validators.required,Validators.minLength(4)]],
          name: [this.professional.name || '', [Validators.required]],
          fromMonth :[this.professional.fromMonth || '',[Validators.required]],
          toMonth:[this.professional.toMonth || '',[]],
          fromYear :[this.professional.fromYear || '', [Validators.required]],
          toYear:[this.professional.toYear || '',[]],
          current:[this.professional.current  || false ,[]],
          verify:[this.professional.verify  || false ,[]],
          reference:[this.professional.reference  || '' ,[]],//Validators.email
          location:[this.professional.location || '',[Validators.required,Validators.minLength(2)]],
          desc:[this.professional.desc || '',[Validators.minLength(8),Validators.maxLength(1000)]]
        })
        // this.addExp.valueChanges.subscribe(val => {
        //     var fromYear = [Validators.required];
        //     var toYear = [];
        //     var fromMonth = [Validators.required];
        //     var toMonth = [];
        //     if (!val.current){
        //       toYear.push(Validators.required);
        //       toMonth.push(Validators.required);
        //     }
        //     if (val.fromYear != ''){
        //         toYear.push(Validators.min(val.fromYear));
        //         this.addExp.get('toYear').setValidators(toYear);
        //
        //     }
        //     if (val.toYear != ''){
        //         fromYear.push(Validators.max(val.toYear));
        //         this.addExp.get('fromYear').setValidators(fromYear);
        //
        //     }
        //     if (val.fromMonth != ''){
        //         toMonth.push(Validators.min(val.fromMonth));
        //         this.addExp.get('fromMonth').setValidators(fromMonth);
        //     }
        //     if (val.toMonth != ''){
        //         fromMonth.push(Validators.max(val.toMonth));
        //         this.addExp.get('toMonth').setValidators(toMonth);
        //     }
        //     this.addExp.get('toYear').updateValueAndValidity();
        //     this.addExp.get('fromYear').updateValueAndValidity();
        //     this.addExp.get('fromMonth').updateValueAndValidity();
        //     this.addExp.get('toMonth').updateValueAndValidity();
        //  });
    }
    addExperience() {
      if(this.addExp.valid){
        this.submitted = false;
        //console.log(this.fileName)
        let file: File = this.fileName[0];
        //this.addExp.value.reference = this.addExp.value.reference.split(',');
        if(!this.isEdit){
            let url = `http://localhost:3000/user/${this.modal.uid}/experience`;
            this.http.post(url,this.addExp.value,this.headers)
            .subscribe((res:any) => {
                if(res && res.experience){
                  if(file)
                    this.uploadDocument(res.experience,file)
                  else{
                    res.experience.edit = false;
                    this.thisExperience.close(res.experience);
                  }
                }
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
        }else{
          let url = `http://localhost:3000/user/${this.modal.uid}/experience/${this.professional._id}`;
          //this.addExp.value.reference.
          //console.log(this.addExp.value)
          this.http.put(url,this.addExp.value,this.headers)
            .subscribe((res:any) => {
                if(res && res.experience &&  res.experience.length > 0){
                  var exp = res.experience[0];
                  exp.edit = true;
                  //console.log(file)
                  if(file)
                    this.uploadDocument(exp,file)
                  else
                    this.thisExperience.close(exp);
                }
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
        }
      }
    }

    uploadDocument(res,file){
      let formData: FormData = new FormData();
      formData.append('document',file,file.name);
      let url = `http://localhost:3000/user/${this.modal.uid}/experience/${res._id}/upload`;
      // var headers = new Headers();
      // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');
      // let options = { headers: headers }
      //, options
        this.http.put(url, formData)
        //.map(x => x)
        .subscribe(
            (res:any) => {
              if(res && res.experience &&  res.experience.length > 0){
                var exp = res.experience[0];
                //exp.edit = true;
                this.thisExperience.close(exp);
              }
            },
            error => console.log(error)
        )
    }

    onCancel(): void  {
      this.thisExperience.close(false);
    }
}
