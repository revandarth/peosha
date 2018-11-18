import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ng2FileInputModule } from 'ng2-file-input';
import { TimeAgoPipe } from 'time-ago-pipe';
import { SharedModule } from './../shared/shared.module';
import { JobsComponent } from './jobs.component';
import { GetjobComponent } from './getjob/getjob.component';
import { PostjobComponent } from './postjob/postjob.component';
import { PjobsComponent } from './pjobs/pjobs.component';
import { ViewjobComponent } from './viewjob/viewjob.component';
import { JobsearchComponent } from './jobsearch/jobsearch.component';
import { SavedjobComponent } from './savedjob/savedjob.component';
import { EasyapplyComponent } from './easyapply/easyapply.component';
import { AppliedComponent } from './applied/applied.component';
const routes: Routes = [
  {path: '', component: JobsComponent,
    children:[
    {path: '', component:GetjobComponent },
    {path: 'post', component: PostjobComponent},
    {path: 'view/:id', component: ViewjobComponent},
  ]},
  {path: 'user', component: PjobsComponent,
  children:[
    {path: '', component:JobsearchComponent},//save
    {path: 'saved', component:  SavedjobComponent},
    {path: 'applied', component: AppliedComponent}
  ]}
];
@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
    Ng2FileInputModule.forRoot(),
  ],
  declarations: [
    JobsComponent,
    GetjobComponent,
    PostjobComponent,
    PjobsComponent,
    JobsearchComponent,
    ViewjobComponent,
    SavedjobComponent,
    EasyapplyComponent,
    AppliedComponent,
    TimeAgoPipe
  ],
  entryComponents: [EasyapplyComponent]
})
export class JobModule {
}
