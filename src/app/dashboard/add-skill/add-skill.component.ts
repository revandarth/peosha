import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA,MatChipInputEvent} from '@angular/material';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {ENTER, COMMA} from '@angular/cdk/keycodes';
@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./../dashboard.component.css'],
  providers: []
})
export class AddSkillComponent implements OnInit {
  skill = [];
  // public user = _userService.currentUser();
  // public userId = this.user._id;
  constructor(public thisSkills: MatDialogRef<AddSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private http:HttpClient) { }
    addOnBlur: boolean = true;
    separatorKeysCodes = [ENTER, COMMA];
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    ngOnInit() {
      //if(!this.data.isadd)
        this.skill = [];//this.data.skill;
        //console.log(this.skill)
     }
    add(event: MatChipInputEvent): void {
      let input = event.input;
      let value = event.value;
            // Add our fruit
      if ((value || '').trim()) {
        this.skill.push({skillset:value.trim()});
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
    remove(skill: any): void {
      let index = this.skill.indexOf(skill);
      if (index >= 0) {
        this.skill.splice(index, 1);
      }
    }
    addSkills():void {
      if(this.skill.length > 0 ){
          let url = `http://localhost:3000/user/${this.data.uid}/skill`;
          var postData = {
            skill:this.skill
          }
          this.http.post(url,postData,this.headers)
          .subscribe((res:any) => {
              if(res && !res.err && res.skill && res.skill.length > 0)
                  this.thisSkills.close(res.skill);
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
      }
    }
    onCancel(): void {
      this.thisSkills.close(false);
    }
}
