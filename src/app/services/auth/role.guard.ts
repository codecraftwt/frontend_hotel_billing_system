import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { SocketService } from '../socket.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private socket:SocketService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const expectedRoles = route.data['expectedRole']; // Access using bracket notation

    return this.authService.getRoles$().pipe(
      map(roles => {
        const hasAccess = expectedRoles.some((role: string) => roles.includes(role));
        if (hasAccess) {
          this.socket.initializeDiningTables()
          return true;
        }
        // Redirect to an appropriate page if the user does not have the required roles
        return this.router.createUrlTree(['/unauthorized']);
      })
    );
  }
}
