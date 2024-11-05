import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent } from './components/table/tables/tables.component';
import { MenusComponent } from './components/menus/menus.component';
import { KdsComponent } from './components/kds/kds.component';
import { VoiceRecognitionComponent } from './voice-recognition/voice-recognition.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './subComponents/user/user.component';
import { PinEntryComponent } from './components/pin-entry/pin-entry.component';
import { RoleGuard } from './services/auth/role.guard';
interface RouteData {
  expectedRole: string[];
}
const routes: Routes = [
  {
    path:"",
    redirectTo:"tables",
    pathMatch:"full"
  },
  // {
  //   path:"tables",
  //   component:TablesComponent,
  //   canActivate: [RoleGuard], // Protect this route
  //   data: { expectedRole: ['counter', 'admin'] } as RouteData  // Specify the required role
  // },
  {
    path:'tables',
    loadChildren:()=>import('./components/table/table.module').then(m=>m.TableModule),
    canActivate: [RoleGuard], // Protect this route
    data: { expectedRole: ['counter', 'admin'] } as RouteData
  },
  {
    path:"menus/:id",
    component:MenusComponent,
    canActivate: [RoleGuard], // Protect this route
    data: { expectedRole: ['counter', 'admin'] } as RouteData
  },
  {
    path: 'kds',
    component: KdsComponent,
    canActivate: [RoleGuard], // Protect this route
    data: { expectedRole: ['kds', 'admin'] } as RouteData  // Specify the required role
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard], // Protect this route
    data: { expectedRole: ['admin'] } as RouteData  // Specify the required role
  },
  {
    path:'voice',
    component:VoiceRecognitionComponent
  },
  {
    path:'user',
    component:PinEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
