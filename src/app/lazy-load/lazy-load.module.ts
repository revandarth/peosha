import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
const routes: Routes = [
    {path: 'auth', loadChildren: '../auth/auth.module#AuthModule'},
    {path: 'login', loadChildren: '../login/login.module#LoginModule'},
    {path: '', redirectTo: '/auth/dashboard', pathMatch: 'full'},
    {path: '**', redirectTo: '/login'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LazyLoadModule { }
