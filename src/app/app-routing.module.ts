import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent } from './components/tables/tables.component';
import { MenusComponent } from './components/menus/menus.component';
import { KdsComponent } from './components/kds/kds.component';
import { VoiceRecognitionComponent } from './voice-recognition/voice-recognition.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './subComponents/user/user.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"tables",
    pathMatch:"full"
  },
  {
    path:"tables",
    component:TablesComponent
  },
  {
    path:"menus/:id",
    component:MenusComponent
  },
  {
    path:'kds',
    component:KdsComponent
  },
  {
    path:'dashboard',
    component:AdminDashboardComponent
  },
  {
    path:'voice',
    component:VoiceRecognitionComponent
  },
  {
    path:'user',
    component:UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
