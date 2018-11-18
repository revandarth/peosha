import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { Ng2FileInputModule } from 'ng2-file-input';
import { PdfViewerModule  } from 'ng2-pdf-viewer';
import { DashboardComponent } from './dashboard.component';
import { AddEducationComponent } from './add-education/add-education.component';
import { UserBioComponent } from './user-bio/user-bio.component';
import { AddProfessionalComponent } from './add-experience/add-professional-dialog.component';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { AddCertificationComponent } from './add-certification/add-certification.component';
//import { ContactsDataService } from './contacts-data.service';
const routes: Routes = [
  {path: '', component: DashboardComponent}
];
@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
    Ng2FileInputModule.forRoot(),
    PdfViewerModule
  ],
  declarations: [
    DashboardComponent,
    UserBioComponent,
    AddEducationComponent,
    AddProfessionalComponent,
    AddSkillComponent,
    AddCertificationComponent
  ],
  entryComponents: [AddProfessionalComponent,AddSkillComponent,AddEducationComponent,AddCertificationComponent,UserBioComponent],
  exports:[]
})
export class DashboardModule {
}
