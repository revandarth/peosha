import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,public cookieService: CookieService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (typeof this.cookieService.get('p_d') === 'undefined') {
            // logged in so return true

            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigateByUrl('/auth/dashboard');
        //return false;
    }
}
