import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route,	Router,
	 ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canLoad(route: Route): boolean {
	  if (this.auth.isAuthenticated()) {
	   return true;
	  }
    this.router.navigate(['login']);
    return false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!!this.auth.isAuthenticated()) {
          return true;
        }
      	this.router.navigate(['login']);
              return false;
  }
}
