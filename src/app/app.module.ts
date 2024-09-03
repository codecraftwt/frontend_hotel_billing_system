import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TablesComponent } from './components/tables/tables.component';
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
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TableService,MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
