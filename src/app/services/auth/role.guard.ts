import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoles = route.data['expectedRole']; // Access using bracket notation

    // Check if the user has any of the expected roles
    const hasAccess = expectedRoles.some((role: string) => this.authService.hasRole(role));

    if (hasAccess) {
      return true;
    }

    // Redirect to an appropriate page if the user does not have the required roles
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
