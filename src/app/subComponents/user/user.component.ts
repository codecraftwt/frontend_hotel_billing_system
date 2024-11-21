import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';
// import { UserService } from './user.service'; // Ensure this path is correct

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  staffForm!: FormGroup; // Reactive form group

  constructor(private fb: FormBuilder, private socketService:SocketService,private toastr:ToastrService) {}

  ngOnInit(): void {
    // Initialize the form with default values and validation rules
    this.staffForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]], // Name is required and must have min length of 3
      usePass: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]], // Password must be exactly 4 digits
      role: ['', Validators.required] // Role is required
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.staffForm.valid) {
      console.log('Staff Data:', this.staffForm.value);
      const { username, usePass, role } = this.staffForm.value;
      this.socketService.signUp(username, usePass, role).subscribe(res=>{
        console.log(res);
        this.toastr.success(res.message, 'Success');
      })
      this.staffForm.reset();
      // Make an API call to save the staff data or any other logic
      // For example, you can call a service method like:
      // this.staffService.addStaff(this.staffForm.value).subscribe(response => { ... });
    } else {
      console.log('Form is invalid');
    }
  }

  // Getter methods to simplify form control access in the template
  get name() {
    return this.staffForm.get('username');
  }

  get password() {
    return this.staffForm.get('usePass');
  }

  get role() {
    return this.staffForm.get('role');
  }
  checkPassStatus:boolean=false
  passMessage:any=''
  passErr:boolean=false
  passSucc:boolean=false
  checkPassword(){
    console.log(this.staffForm.value.usePass);
    let pass= this.staffForm.value.usePass
    console.log(pass.length);
    if(pass.length==4){
      this.socketService.checkUserPass(pass).subscribe(
        res=>{
        console.log(res,'check pass');
        if(res.message){
          this.checkPassStatus=true
          this.passErr=false
          this.passSucc=true
          this.passMessage=res.message
        }
      },
    
      err =>{
        console.log(err.error.error,'error');
        this.checkPassStatus=true
        this.passSucc=false
        this.passErr=true
        this.passMessage=err.error.error
      }
    )
    }else{
      this.checkPassStatus=false
      this.passMessage=''
      this.passSucc=false
      this.passErr=false
    }
      
  }
}
