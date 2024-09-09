import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  Base_URL:any=environment.apiUrl

  private socket: Socket;

  private apiUrl = `${this.Base_URL}/api/dining-tables`
  private updateTableWithOrderapiUrl = `${this.Base_URL}/api/tables/`;
  private foodCategoryapiUrl = `${this.Base_URL}/api/foodCategory`;
  private foodItemsapiUrl = `${this.Base_URL}/api/foodItems`;
  private ordersapiUrl = `${this.Base_URL}/api/orders`; //get api
  private updateapiUrl=`${this.Base_URL}/api/updateFoodItemQuantity`
  private updateOrderNoteapiUrl=`${this.Base_URL}/api/updateOrderNote`
  private deleteapiUrl=`${this.Base_URL}/api/deleteFoodItem`
  private getallapiUrl=`${this.Base_URL}/api/getAllOrders`
  private getallOrderAminapiUrl=`${this.Base_URL}/api/getAllOrdersAdmin`
  private updateFoodItemStatusapiUrl=`${this.Base_URL}/api/updateFoodItemStatus`
  private updateOrderKotStatusapiUrl=`${this.Base_URL}/api/updateOrderKotStatus`
  private updatePaymentTypeapiUrl=`${this.Base_URL}/api/update-payment-type`
  private updateDiscountapiUrl=`${this.Base_URL}/api/update-discount`
  private addCustomerNameapiUrl=`${this.Base_URL}/api/add-customer-name`
  private updateOrderStatusapiUrl=`${this.Base_URL}/api/orders/updateStatus`
  private updateTableStatusapiUrl=`${this.Base_URL}/api/tables/`
  private statusUrl=`${this.Base_URL}/api/status`
  private baseUrl = `${this.Base_URL}/api/foodItems`

  private diningTablesSubject = new BehaviorSubject<any[]>([]);
  private foodCategorySubject = new BehaviorSubject<any[]>([]);
  private foodItemsSubject = new BehaviorSubject<any[]>([]);
  private ordersSubject = new BehaviorSubject<any[]>([]);
  private getAllordersSubject = new BehaviorSubject<any[]>([]);
  private getAllordersAdminSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.socket = io(`${this.Base_URL}`);
    this.initializeDiningTables();
  }

  private initializeDiningTables(): void {
    this.fetchDiningTables();
    this.fetchFoodCategory()
    this.fetchFoodItems()
    this.fetchAllOrders()
    this.fetchAllOrdersAdmin()

    this.setupSocketListeners()
  }

  private fetchDiningTables(): void {
    this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching dining tables:', error);
          return []; // Return an empty array in case of error
        })
      )
      .subscribe(data => this.diningTablesSubject.next(data));
  }
  private fetchFoodCategory(): void {
    this.http.get<any[]>(this.foodCategoryapiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching dining tables:', error);
          return []; // Return an empty array in case of error
        })
      )
      .subscribe(data => this.foodCategorySubject.next(data));
  }
  private fetchFoodItems(): void {
    this.http.get<any[]>(this.foodItemsapiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching dining tables:', error);
          return []; // Return an empty array in case of error
        })
      )
      .subscribe(data => this.foodItemsSubject.next(data));
  }
   fetchOrders(tableNo:any): void {
    this.http.get<any[]>(this.ordersapiUrl+'/'+tableNo)
      .pipe(
        catchError(error => {
          console.error('Error fetching dining tables:', error);
          this.ordersSubject.next([])
          this.fetchDiningTables()
          return []; // Return an empty array in case of error
        })
      )
      .subscribe(data => this.ordersSubject.next(data));
  }
  private fetchAllOrders(): void {
    this.http.get<any[]>(this.getallapiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching dining tables:', error);
          return []; // Return an empty array in case of error
        })
      )
      .subscribe(data => this.getAllordersSubject.next(data));
  }
  private fetchAllOrdersAdmin(): void {
    this.http.get<any[]>(this.getallOrderAminapiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching dining tables:', error);
          return []; // Return an empty array in case of error
        })
      )
      .subscribe(data => this.getAllordersAdminSubject.next(data));
  }

  private setupSocketListeners(): void {
    this.socket.on('updateTables', (data: any[]) => {this.fetchDiningTables()});
    this.socket.on('newCategory', (data: any[]) => {this.foodCategorySubject.next(data)});
    this.socket.on('newFoodItem', (data: any[]) => {this.foodItemsSubject.next(data)});
    this.socket.on('orderUpdated', (data: any[]) => {this.ordersSubject.next(data)});
    this.socket.on('orderUpdated', (data: any[]) => {this.fetchAllOrders(),this.fetchDiningTables(),this.fetchAllOrdersAdmin()});
  }
  
  getDiningTables(): Observable<any[]> {
    return this.diningTablesSubject.asObservable();
  }
  getFoodCategory(): Observable<any[]> {
    return this.foodCategorySubject.asObservable();
  }
  getFoodItems(): Observable<any[]> {
    return this.foodItemsSubject.asObservable();
  }
  getOrdersItems(): Observable<any[]> {
    return this.ordersSubject.asObservable();
  }
  getAllOrdersItems(): Observable<any[]> {
    return this.getAllordersSubject.asObservable();
  }
  getAllOrdersAdminItems(): Observable<any[]> {
    return this.getAllordersAdminSubject.asObservable();
  }
  getFoodItemsByCategoryId(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${categoryId}`);
  }
  createOrders(tableNo:any,foodItemId:any):Observable<any>{
    return this.http.post<any>(this.ordersapiUrl,{
      tableNo,
      foodItemId
    })
  }
  updateOrderQty(tableNo:any,foodItemId:any,quantity:any,createdAt:any):Observable<any>{
    return this.http.put(this.updateapiUrl,{
      tableNo,
      foodItemId,
      quantity,
      createdAt
    })
  }
  updateOrderNote(tableNo:any,foodItemId:any,orderNote:any,createdAt:any):Observable<any>{
    return this.http.put(this.updateOrderNoteapiUrl,{
      tableNo,
      foodItemId,
      orderNote,
      createdAt
    })
  }
  deleteOrder(tableNo:any,foodItemId:any,createdAt:any):Observable<any>{
    return this.http.put(this.deleteapiUrl,{
      tableNo,
      foodItemId,
      createdAt
    })
  }
  updateFoodItemStatus(tableNo:any,foodItemId:any,status:any,createdAt:any):Observable<any>{
    return this.http.put<any>(this.updateFoodItemStatusapiUrl,{
      tableNo,
      foodItemId,
      status,
      createdAt
    })
  }
  updateOrderKotStatus(tableNo:any,newKotStatus:any):Observable<any>{
    return this.http.patch<any>(this.updateOrderKotStatusapiUrl,{
      tableNo,
      newKotStatus
    })
  }
  updatePaymentType(tableNo:any,paymentType:any):Observable<any>{
    return this.http.patch<any>(this.updatePaymentTypeapiUrl,{
      tableNo,
      paymentType
    })
  }
  updateTableWithOrder(tableNo:any,orderId:any):void{
    this.http.put<any>(this.updateTableWithOrderapiUrl+tableNo,{
      orderId
    }).pipe(
      catchError(error => {
        console.error('Error fetching dining tables:', error);
        return []; // Return an empty array in case of error
      })
    )
    .subscribe(data => {console.log(data,'data')
      // if(data.order != ""){
      //   this.fetchDiningTables()
      //   this.listenForTableUpdates();
      // }
    });
  }
  updateDiscount(tableNo:any,discountPercent:any):Observable<any>{
    return this.http.patch<any>(this.updateDiscountapiUrl,{
      tableNo,
      discountPercent
    })
  }
  addCustomerName(tableNo:any,customerName:any):Observable<any>{
    return this.http.patch<any>(this.addCustomerNameapiUrl,{
      tableNo,
      customerName
    })
  }
  updateOrderStatus(tableNo:any,newStatus:any):Observable<any>{
    return this.http.patch<any>(this.updateOrderStatusapiUrl,{
      tableNo,
      newStatus
    })
  }
  updateTableStatus(tableNo:any,status:any):Observable<any>{
    return this.http.patch<any>(this.updateTableStatusapiUrl+tableNo+'/status',{
      status
    })
  }

  // Search data based on the search term
  searchData(data: any[], searchTerm: string): any[] {
    if (!searchTerm.trim()) {
      return [];
    }
    return data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.shortcode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
