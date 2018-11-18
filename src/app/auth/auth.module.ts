import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes,CanLoad, CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { PerfectScrollbarModule ,PERFECT_SCROLLBAR_CONFIG,PerfectScrollbarConfigInterface  } from 'ngx-perfect-scrollbar';
import { SharedModule} from './../shared/shared.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth.guard.service';
export const appRoutes: Routes = [{
    path:'',component: AuthComponent, children: [
      {path: 'dashboard',loadChildren: '../dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuardService]},
      {path: 'jobs',loadChildren: '../job/job.module#JobModule', canLoad: [AuthGuardService]},
      {path: 'company',loadChildren: '../company/company.module#CompanyModule', canLoad: [AuthGuardService]},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]}
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    CoreModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [AuthComponent],
  providers: [
    CookieService,
    AuthService,
    AuthGuardService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    }
  ]
})
export class AuthModule { }
