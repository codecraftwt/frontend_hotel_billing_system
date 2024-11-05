import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roles: string[] = [];
  private rolesSubject = new BehaviorSubject<string[]>(this.getUserRoles());
  private closeLoginModuleSubject = new BehaviorSubject<boolean>(false);

  constructor(private toastr: ToastrService,private route:Router,private socket:SocketService) {
    this.roles = this.rolesSubject.value; // Initialize roles from the BehaviorSubject
  }

  getUserRoles(): string[] {
    const roles = localStorage.getItem('role'); 
    return roles ? JSON.parse(roles) : []; 
  }

  // Method to update roles and notify subscribers
  updateRoles(res: any) {
    let index=res.timesheet.length
   
    if(res.timesheet[index-1].status=="off duty"){
      this.toastr.info('You have successfully logged out.', 'Logout Status');
      localStorage.removeItem('role')
      this.roles = res.role;
      this.rolesSubject.next([]);
      this.closeLoginModuleSubject.next(false);
      this.route.navigate(['/'])
    }
    if(res.timesheet[index-1].status=="on duty"){
      this.toastr.success('You have successfully logged in!', 'Login Status');
      this.roles = res.role;
      localStorage.setItem('role', JSON.stringify(res.role)); // Update localStorage
      this.rolesSubject.next(this.roles); // Emit the new roles

            // Set the closeLoginModule to true for 'admin' or 'counter' roles
            if (res.role[0] === "admin" || res.role[0] === "counter") {
              this.closeLoginModuleSubject.next(true);
            } else {
              this.closeLoginModuleSubject.next(false);  // Default to false for other roles
            }

            
      if(res.role[0]=="admin"){
          this.route.navigate(['/dashboard'])
      }
      if(res.role[0]=="counter"){
        this.route.navigate(['/tables'])
      }
      if(res.role[0]=="kds"){
        this.route.navigate(['/kds'])
      }
    }
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role)); // Check if user has any of the provided roles
  }

  // Expose the roles as an observable for subscribers
  getRoles$() {
    return this.rolesSubject.asObservable();
  }
  getCloseLoginModule$() {
    return this.closeLoginModuleSubject.asObservable();
  }
}
