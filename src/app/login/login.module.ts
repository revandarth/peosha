import { NgModule } from '@angular/core';
import { SharedModule} from './../shared/shared.module';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './../login/log-auth-service';
const routes: Routes = [
    {path: '', component: LoginComponent
    //canActivate: [AuthGuard]
  },
  ];
@NgModule({
    imports: [
        SharedModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    declarations: [
        LoginComponent,
    ],
    providers: [CookieService,AuthGuard]
})
export class LoginModule {
}
