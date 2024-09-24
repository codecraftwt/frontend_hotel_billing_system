import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private toastr: ToastrService,private sound:SoundService) { }

  ngOnInit(): void {
  }

  isModalOpen = false;

  openModal() {
    this.sound.playSound()
    this.isModalOpen = true;
  }

  closeModal() {
    this.sound.playSound()
    this.isModalOpen = false; // Update this method if needed
  }

  sounds(){
    this.sound.playSound()
  }

}
