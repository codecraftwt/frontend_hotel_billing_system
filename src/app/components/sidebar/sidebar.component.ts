import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private intervalId: any;

  constructor(private toastr: ToastrService,private sound:SoundService,private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getUserRoles()
    const role = JSON.parse(localStorage.getItem('role') || 'null');
    console.log(role,'role');
    if(role==null){
      this.openModal()
    }else{
      this.startRoleCleanup();
    }
  }

  isModalOpen = false;
  isModalOpenR = false;

  openModal() {
    this.sound.playSound()
    this.isModalOpen = true;
  }

  closeModal() {
    console.log('hiiii');
    const role = JSON.parse(localStorage.getItem('role') || 'null');
    console.log(role,'role');
    if(role!=null){
      this.startRoleCleanup();
      this.sound.playSound()
      this.isModalOpen = false; // Update this method if needed
    }
  }
  openModalR() {
    this.sound.playSound()
    this.isModalOpenR = true;
  }

  closeModalR() {
    this.sound.playSound()
    this.isModalOpenR = false; // Update this method if needed
  }

  sounds(){
    this.sound.playSound()
  }


  // this.startRoleCleanup();

  private startRoleCleanup() {
    this.intervalId = setInterval(() => {
      this.checkAndRemoveRole();
    }, 60000); // Check every minute
  }

  private stopRoleCleanup() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private checkAndRemoveRole() {
    console.log('hi');
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day
    // endOfDay.setHours(16, 50, 0, 0); // Set to 3 PM


    if (now.getTime() >= endOfDay.getTime()) {
      localStorage.removeItem('role');
      console.log('Role removed from localStorage at end of the day.');
      this.openModal()
    }
  }

  hasRole(role: string): boolean {
    return this.auth.hasRole(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return this.auth.hasAnyRole(roles);
  }
}
