import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roles: string[] = [];

  constructor() {
    this.roles = this.getUserRoles();
  }

  getUserRoles(): string[] {
    const roles = localStorage.getItem('role'); // Assuming roles are stored as a JSON string
    return roles ? JSON.parse(roles) : []; // Parse the JSON string into an array
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role)); // Check if user has any of the provided roles
  }
}
