import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // constructor(private wsService: WebSocketService) {}

  // signup(username: string, photo: string) {
  //   this.wsService.emit('signup', { username, photo });
  // }

  // login(photo: string) {
  //   this.wsService.emit('login', { photo });
  // }

  // logout(photo: string) {
  //   this.wsService.emit('logout', { photo });
  // }

  // onSignupResponse(callback: (data: any) => void) {
  //   this.wsService.on('signupResponse', callback);
  // }

  // onLoginResponse(callback: (data: any) => void) {
  //   this.wsService.on('loginResponse', callback);
  // }

  // onLogoutResponse(callback: (data: any) => void) {
  //   this.wsService.on('logoutResponse', callback);
  // }

  private apiUrl = 'http://localhost:3000/api'; // Change this to your backend URL

  constructor(private http: HttpClient) {}

  signup(username: string, base64Image: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, base64Image });
  }

  login(base64Image: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { base64Image });
  }

  logout(base64Image: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, { base64Image });
  }

  post(image:any,image2:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/compare`,{image})
  }
  upload(name:any,image:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/user`,{name,image})
  }
  compared(image:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/compare-with-stored`,{image})
  }

}
