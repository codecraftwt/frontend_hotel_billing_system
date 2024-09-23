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
  user:any=''
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

  convertBase64ToBlob(base64: string, contentType: string): Blob {
    const sliceSize = 512;
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }


  handleImage(image: any): void {
    console.log(image._imageAsDataUrl,'image');
    console.log(this.user,'this.user');
    
    this.userService.post(image._imageAsDataUrl,image._imageAsDataUrl).subscribe(res=>{
      console.log(res,'res');
      
    })
    // this.userService.compared(image._imageAsDataUrl).subscribe(res=>{
    //   console.log(res,'res');
      
    // })
    // this.userService.upload(this.user,image._imageAsDataUrl).subscribe(res=>{
    //   console.log(res,'res');
      
    // })
    // this.userService.post(image._imageAsDataUrl,image._imageAsDataUrl).subscribe(res=>{
    //   console.log(res,'res');
      
    // })
    
    this.webcamImage = image as WebcamImage; // Type assertion
    console.log(this.webcamImage,'webcamImage');
    
    const base64Image = this.webcamImage.imageAsDataUrl.split(',')[1];
    console.log('Captured Image:', base64Image);
    const contentType = 'image/jpeg'; // Or the appropriate MIME type for your image
    // Convert Base64 to Blob
    const imageBlob = this.convertBase64ToBlob(base64Image, contentType);

    // Create an object URL for the Blob
    const imageObjectUrl = URL.createObjectURL(imageBlob);
    console.log(imageObjectUrl, 'imageObjectUrl');

    // console.log('Captured Image JSON:', JSON.parse(base64Image));
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
      console.log(base64Image, 'base64Image');

      // if (action === 'signup') {
      //   this.userService.signup('testuser', base64Image).subscribe(response => {
      //     console.log('Signup Response:', response);
      //   });
      // } else if (action === 'login') {
      //   this.userService.login(base64Image).subscribe(response => {
      //     console.log('Login Response:', response);
      //   });
      // } else if (action === 'logout') {
      //   this.userService.logout(base64Image).subscribe(response => {
      //     console.log('Logout Response:', response);
      //   });
      // }
    }
  }

  
}
