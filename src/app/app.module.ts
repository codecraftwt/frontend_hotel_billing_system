import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TablesComponent } from './components/table/tables/tables.component';
import { MenusComponent } from './components/menus/menus.component';
import { FormsModule } from '@angular/forms';
import { KdsComponent } from './components/kds/kds.component';
import { VoiceRecognitionComponent } from './voice-recognition/voice-recognition.component';
import { HttpClientModule } from '@angular/common/http';
import { TableService } from './services/table.service';
import { MenuService } from './services/menu.service';
import { FoodCatagoriesListComponent } from './subComponents/food-catagories-list/food-catagories-list.component';
import { FoodItemsListComponent } from './subComponents/food-items-list/food-items-list.component';
import { BillingSystemComponent } from './subComponents/billing-system/billing-system.component';
import { PrintPageComponent } from './print-page/print-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
// import { AgGridModule } from 'ag-grid-angular';
import { WebcamModule } from 'ngx-webcam';
// import { UserComponent } from './subComponents/user/user.component';
import { PinEntryComponent } from './components/pin-entry/pin-entry.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { SoundService } from './services/sound.service';
import { ChairIconComponent } from './subComponents/chair-icon/chair-icon.component';
import { ReservationTableComponent } from './subComponents/reservation-table/reservation-table.component';
import { SortByDatePipe } from './pipes/sort-by-date.pipe';
import { UtcToIstPipe } from './pipes/utc-to-ist.pipe';
import { AuthService } from './services/auth.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { SplineAreaComponent } from './subComponents/spline-area/spline-area.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TablesComponent,
    MenusComponent,
    KdsComponent,
    VoiceRecognitionComponent,
    FoodCatagoriesListComponent,
    FoodItemsListComponent,
    BillingSystemComponent,
    PrintPageComponent,
    AdminDashboardComponent,
    // UserComponent,
    PinEntryComponent,
    CustomModalComponent,
    ChairIconComponent,
    ReservationTableComponent,
    SortByDatePipe,
    UtcToIstPipe,
    SplineAreaComponent
  ],
  imports: [
    // AgGridModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Customize position
      timeOut: 3000, // Duration for which the toast is displayed
      preventDuplicates: true // Prevent duplicate toasts
    }),
    WebcamModule,
    FormsModule ,
    CanvasJSAngularChartsModule
  ],
  providers: [TableService,MenuService,DatePipe,SoundService ,AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppModule { }
