import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = environment.apiUrl;
  private endPoint ={
    GetFoodCategories:'/FoodCategories/GetFoodCategories',
    GetFoodItemsByFoodCategoryId:'/FoodItems/GetFoodItemsByFoodCategoryId/',

  } 

  constructor(private http:HttpClient) { }

  getFoodCategorories(): Observable<any> {
    return this.http.get<any>(this.apiUrl+this.endPoint.GetFoodCategories)
  }
  getFoodItems(foodCategoryId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl+this.endPoint.GetFoodItemsByFoodCategoryId+foodCategoryId)
  }
}
