import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
// import { UserService } from './user.service'; // Ensure this path is correct

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public showWebcam = true;
  public webcamImage: WebcamImage | null = null; // Adjusted type definition
  public trigger: Subject<void> = new Subject<void>(); // Changed from private to public
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  constructor(private userService: UserService) {
    // this.userService.onSignupResponse(data => {
    //   console.log('Signup Response:', data);
    // });

    // this.userService.onLoginResponse(data => {
    //   console.log('Login Response:', data);
    // });

    // this.userService.onLogoutResponse(data => {
    //   console.log('Logout Response:', data);
    // });
  }

  handleImage(image: any): void {
    this.webcamImage = image as WebcamImage; // Type assertion
    const base64Image = this.webcamImage.imageAsDataUrl.split(',')[1];
    console.log('Captured Image:', base64Image);
  }

  triggerSnapshot(): void {
    this.trigger.next(); // Correct usage of Subject
  }

  toggleWebcam() {
    this.showWebcam = !this.showWebcam;
  }

  captureImage(action: 'signup' | 'login' | 'logout') {
    this.triggerSnapshot();
    if (this.webcamImage) {
      const base64Image = this.webcamImage.imageAsDataUrl.split(',')[1];
      if (action === 'signup') {
        this.userService.signup('testuser', base64Image).subscribe(response => {
          console.log('Signup Response:', response);
        });
      } else if (action === 'login') {
        this.userService.login(base64Image).subscribe(response => {
          console.log('Login Response:', response);
        });
      } else if (action === 'logout') {
        this.userService.logout(base64Image).subscribe(response => {
          console.log('Logout Response:', response);
        });
      }
    }
  }
}
