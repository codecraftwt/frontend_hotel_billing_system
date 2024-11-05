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
  
  isModalOpen = false;
  isModalOpenR = false;

  constructor(private toastr: ToastrService,private sound:SoundService,private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getUserRoles()
    const role = JSON.parse(localStorage.getItem('role') || 'null');
    if(role==null){
      this.openModal()
    }else{
      this.startRoleCleanup();
    }
    this.auth.getCloseLoginModule$().subscribe((status)=>{
      if(status){
        this.closeModal()
      }
    })

  }


  openModal() {
    this.sound.playSound()
    this.isModalOpen = true;
  }

  closeModal() {
    const role = JSON.parse(localStorage.getItem('role') || 'null');
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
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day
    // endOfDay.setHours(16, 50, 0, 0); // Set to 3 PM

    if (now.getTime() >= endOfDay.getTime()) {
      localStorage.removeItem('role');
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
