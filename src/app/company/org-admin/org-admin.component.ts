import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA , MatSnackBar} from '@angular/material';
import { HttpService }  from './../../services/http.service';
import { UserService }     from './../../services/user/user.service';
import { Router,ActivatedRoute } from '@angular/router';
import { OrgLocationComponent } from './../org-location/org-location.component';
@Component({
  selector: 'app-org-admin',
  templateUrl: './org-admin.component.html',
  styleUrls: ['./org-admin.component.css','./../../styles/user.css']
})
export class OrgAdminComponent implements OnInit {
  updateOrg: FormGroup;
  userId = this._userService.getUserId();
  editAbout:boolean = false;
  orgId:string;
  orgData:IorgData = {};
  employees:IorgType[] = [
    {id:0,name:"0-1 employees"},
    {id:2,name:"11-50 employees"},
    {id:11,name:"51-200 employees"},
    {id:201,name:"201-500 employees"},
    {id:501,name:"501-1,000 employees"},
    {id:1001,name:"1,001-5,000 employees"},
    {id:5001,name:"5,001-10,000 employees"},
    {id:10001,name:"10,001+ employees"}
  ];
   orgtype:IorgType[] = [
     {id:0,name:"Public Company"},
     {id:1,name:"Educational Institution"},
     {id:2,name:"Self-Employed"},
     {id:3,name:"Government Agency"},
     {id:4,name:"Non Profit"},
     {id:5,name:"Sole Proprietorship"},
     {id:6,name:"Privately Held"},
     {id:7,name:"Partnership"}
  ];
  constructor(private _fb:FormBuilder,public dialog: MatDialog,private _userService:UserService,private httpService:HttpService,private route:ActivatedRoute,public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orgId = params.id;
    });
    this.updateOrg = this._fb.group({
      website:['',[Validators.required]],
      size:['',[Validators.required]],
      industry: ['',[Validators.required]],
      founded:['',[Validators.required]],
      company_type:['',[Validators.required]],
      desc:['',[Validators.required]]
    })
    this.getCompany();
    this.onChanges();
  }
getempText(id){
  var name = "";
  this.employees.forEach(eachObj => {
    if(eachObj.id == id){
        name = eachObj.name;
    }
  });
  return name;
}
orgtypeText(id){
  var name = "";
  this.orgtype.forEach(eachObj => {
    if(eachObj.id == id){
        name = eachObj.name;
    }
  });
  return name;
}
getCompany(){
  this.httpService.getData(`http://localhost:3000/user/${this.userId}/company/${this.orgId}`)
  .subscribe((x:any) => {
    if(!x.err && x.company){
      this.orgData = x.company;
      if(this.orgData.website){
        this.updateOrg = this._fb.group({
          website:[this.orgData.website,[Validators.required]],
          size:[this.orgData.size,[Validators.required]],
          industry: [this.orgData.industry,[Validators.required]],
          founded:[this.orgData.founded,[Validators.required]],
          company_type:[this.orgData.company_type,[Validators.required]],
          desc:[this.orgData.desc,[Validators.required]]
        });
        this.editAbout =  true;
        this.orgData.head_quarters = this.orgData.location.filter((element, index, array) => {
            return (element.head_quarters)
        });
        this.orgData.location = this.orgData.location.sort((a,b) => {
          return b.head_quarters - a.head_quarters
        })
      }else{
        this.editAbout =  false;
      }
    }
  });
}
onChanges(): void {
  this.updateOrg.valueChanges.subscribe(val => {
      console.log(val);
  });
}
updateCompany(){
  if(this.updateOrg.valid){

    let body = this.updateOrg.value;
    this.httpService.updateData(`http://localhost:3000/user/${this.userId}/company/${this.orgId}`,body)
      .subscribe((res:any) => {
        if(res && !res.err){
          this.snackBar.open(`${res.emp.name} is updated successfully`,'Close',{
             duration: 2000
           });
            this.orgData = res.emp;
            this.editAbout = true;
        }
      },() => {
          console.log('err');
      });
  }
}
deleteLocation(index){
    // var url = `http://localhost:3000/user/${this.userId}/company`
    // //${this.state.params.id}/location`;
    // var  body = {index:index}
    // this.http.delete(url,body)
    //   .subscribe((res:any) => {
    //     if(res && !res.err){
    //         this.orgData.location  = res.location;
    //         this.snackBar.open(`Location is deleted successfully`,'Close',{
    //            duration: 2000
    //          });
    //     }
    //   },() => {
    //       console.log('err');
    //   });
  }
  openLocation(data) {
     let dialogRef = this.dialog.open(OrgLocationComponent, {
       width: '75%',
       data:{
         uid:this.userId,
         location:data || {}
       }
     });
     dialogRef.afterClosed().subscribe(result => {
        if(result){
            this.orgData.location.push(result);
            this.snackBar.open(`Location is added successfully`,'Close',{
             duration: 2000
           });
        }
      });
  }
}

interface IorgData{
  website?:any,
  head_quarters?:any,
  size?:number,
  industry?:any,
  founded?:number,
  company_type?:string,
  desc?:string,
  location?:any
}

interface IorgType{
  id:number,
  name:string
}
interface Ibody{
  index:number
}
