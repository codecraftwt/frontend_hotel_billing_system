import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = environment.apiUrl;
  private endPoint = '/Table/GetDiningTables';

  constructor(private http: HttpClient) { }

  getDiningTables(): Observable<any> {
    return this.http.get<any>(this.apiUrl+this.endPoint);
  }
}
