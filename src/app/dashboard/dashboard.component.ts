import { Component, Inject ,OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA ,MatSnackBar} from '@angular/material';
import { AddProfessionalComponent } from './add-experience/add-professional-dialog.component';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { UserBioComponent } from './user-bio/user-bio.component';
import { AddEducationComponent } from './add-education/add-education.component';
import { AddCertificationComponent } from './add-certification/add-certification.component';
import { CookieService } from 'ngx-cookie-service';
import { UserService }  from './../services/user/user.service';
import { HttpService }  from './../services/http.service';
import { PDFProgressData, PDFDocumentProxy } from 'pdfjs-dist';
import { PdfViewerComponent } from "ng2-pdf-viewer";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','./../styles/user.css']
})
export class DashboardComponent implements OnInit{
    @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
    constructor(private _userService:UserService,public dialog: MatDialog,public snackBar: MatSnackBar,public httpService:HttpService) {}
    experience = [];
    error: any;
    page: number = 1;
    rotation: number = 0;
    zoom: number = 1.0;
    originalSize: boolean = false;
    pdf: any;
    renderText: boolean = false;
    progressData: PDFProgressData;
    isLoaded: boolean = false;
    stickToPage = false;
    showAll: boolean = false;
    autoresize: boolean = true;
    fitToPage: boolean = true;
    outline: any[];
    isOutlineShown: boolean = true;
    onProgress(progressData: PDFProgressData) {
      this.progressData = progressData;
      this.isLoaded = false;
      this.error = null; // clear error
    }
    showmsg(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
    userId = this._userService.getUserId();
    showingMore = false;
    skill = [];
    bioData = {};
    education = [];
    certification = [];
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
    ngOnInit() {
       this.getuserBio();
    }
    getMonthText(id){
      var name = "";
      this.months.forEach(eachObj => {
        if(eachObj.id == id){
            name = eachObj.value;
        }
      });
      return name;
    }
addExperience(data) {
 let dialogRef = this.dialog.open(AddProfessionalComponent, {
   width: '60%',
   data:{ data: data || { }, uid:this.userId }
 });
 dialogRef.afterClosed().subscribe(result => {
   if(result){
        if(result.edit){
          this.showmsg(`${result.name} is updated successfully`,"Close");
          var index = this.experience.findIndex(x => x._id == result._id);
          this.experience[index] = result;
      }
      else{
        this.showmsg(`${result.name} is added successfully`,"Close");
        this.experience.push(result);
      }
   }
 });
}
updateIntro() {
    let dialogRef = this.dialog.open(UserBioComponent, {
        width: '80%',
        data:{bio:this.bioData || { },uid:this.userId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.bioData = result;
        this.showmsg(`Your profile is updated successfully`,"Close");
      }
    });
}
 addCertification(data) {
    let dialogRef = this.dialog.open(AddCertificationComponent, {
      width: '80%',
      data:{cer:data || { },uid:this.userId}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
       if(result.edit){
          this.certification[result._id] = result;
          this.showmsg(`${result[0].certification_name} is updated successfully`,"Close");
       }else{
         this.certification.push(result);
         this.showmsg(`${result.certification_name} is updated successfully`,"Close");
       }
      }
    });
 }
 addSkill() {
   var isadd  = false;//(this.skills.length == 0)?true:false;
    let dialogRef = this.dialog.open(AddSkillComponent, {
      width: '80%',
      data:{skill:this.skill,uid:this.userId,isadd:isadd}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
         this.skill = result;
    });
}
OpenEducation(edu) {
 let dialogRef = this.dialog.open(AddEducationComponent, {
   width: '80%',
   data:{edu:edu || { },uid:this.userId}
 });
 dialogRef.afterClosed().subscribe(result => {
   if(result){
    if(result.edit){
      var index = this.education.findIndex(x => x._id == result._id);
      this.education[index] = result;
      this.showmsg(`${result[0].institution_name} is updated successfully`,"Close");
    } else{
      this.showmsg(`${result.institution_name} is added successfully`,"Close");
      this.education.push(result);
    }
   }
 });
}
deleteEducation(edu,index) {
  this.httpService.deleteData(`http://localhost:3000/user/${this.userId}/education/${edu._id}`)
   .subscribe((res:any) => {
     if(!res.err && res.data){
       this.showmsg(`${edu.institution_name} is deleted successfully`,"Close");
        this.education.splice(index,1);
     }
   }, (error) => {
       console.log(error);
   });
}
 deleteExperience(exp,index) {
   this.httpService.deleteData(`http://localhost:3000/user/${this.userId}/experience/${exp._id}`)
   .subscribe((res:any) => {
       if(!res.err && res.data){
         this.showmsg(`${exp.name} is deleted successfully`,"Close");
          this.experience.splice(index,1);
       }
   }, () => {
       console.log('error');
   });
}
deleteCertification(cer,index) {
   this.httpService.deleteData(`http://localhost:3000/user/${this.userId}/certificate/${cer._id}`)
   .subscribe((res:any) => {
       if(!res.err && res.data){
         this.certification.splice(index,1);
         this.showmsg(`${cer.certification_name} is deleted successfully`,"Close");
       }
   }, (error) => {
       console.log(error);
   });
}
 getuserBio(){
   this.httpService.getData(`http://localhost:3000/user/${this.userId}/bio`)
     .subscribe((res:any) => {
        if(!res.err && res.data != null){
          this.bioData = res.data.bio;
          this.skill  = res.data.skill;
          this.experience = res.data.experience;
          this.education = res.data.education;
          this.certification = res.data.certification;
          this.experience.map(exp => {
            if(exp == null) exp = undefined;
            if(exp)
              exp.document =  (exp.document && exp.document != "")?'http://localhost:3000/'+exp.document:null;
              return exp;
          });
          this.education.map(edu => {
           edu.document =  (edu.document && edu.document != "")?'http://localhost:3000/'+edu.document:null;
           return edu;
          });
        }
     }, () => {
         console.log('error');
     });
 }
 showMore(){
   this.showingMore = !this.showingMore;
 }
}
