import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { CompanyComponent } from './company.component';
import { OrgAdminComponent } from './org-admin/org-admin.component';
import { OrgLocationComponent } from './org-location/org-location.component';
import { CompanyviewComponent } from './companyview/companyview.component';
const routes: Routes = [
  {path: '', component: CompanyComponent},
  {path: 'admin/:id', component: OrgAdminComponent},
  {path: ':id', component: CompanyviewComponent},
];
@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    CompanyComponent,
    OrgAdminComponent,
    OrgLocationComponent,
    CompanyviewComponent
  ],
  entryComponents: [OrgLocationComponent],
  exports:[]
})
export class CompanyModule {
}
