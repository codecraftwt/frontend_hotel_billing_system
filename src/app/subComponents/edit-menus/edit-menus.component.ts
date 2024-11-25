import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-edit-menus',
  templateUrl: './edit-menus.component.html',
  styleUrls: ['./edit-menus.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0%)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(600)
      ]),
      // transition('* => void', [
      //   animate(300, style({ transform: 'translateX(100%)' }))
      // ])
    ])
  ]
})
export class EditMenusComponent implements OnInit,  AfterViewChecked {
  foodCatagoriesData: any = []
  foodCatagoriesIdandName: any
  foodeItemsData: any = []
  foodeItemsDataFilterData: any = []

  userformData = {
    name: '',
    categoryId: '',
    categoryName: '',
    price: 0,
    image: null,
    type: '',
    shortcode: ''
  };

  userFormDataStatu:boolean=false

  imagePreview: string | null = null;
  @ViewChild('imageInput', { static: false }) imageInputRef: ElementRef | undefined;
  constructor(private socketSevice: SocketService, private cdRef: ChangeDetectorRef) { }

  // ngAfterViewInit(): void {
  //   if (this.imageInputRef) {
  //     this.imageInputRef.nativeElement.click();
  //   } else {
  //     console.log('imageInputRef is undefined!');
  //   }
  // }
  ngAfterViewChecked() {
    if (!this.imageInputRef) {
      const imageInputElement = document.getElementById('imageInput');
      if (imageInputElement) {
        this.imageInputRef = new ElementRef(imageInputElement);
        console.log('ngAfterViewChecked - imageInputRef set manually:', this.imageInputRef);
      }
    }
  }
  ngOnInit() {
    this.socketSevice.getFoodCategory().pipe(
      map((res) => res.map((category) => ({
        _id: category._id,
        name: category.name,
      }))),
      distinctUntilChanged((prev: any, curr: any) => prev.length === curr.length),
      tap((newData) => {
        // console.log('New Food Categories Data:', newData);
        // console.log('New length:', newData.length);
      })
    ).subscribe(
      (updatedData) => {
        updatedData.unshift({ _id: '1', name: 'Add category' });
        this.foodCatagoriesData = updatedData;
        console.log('Updated food categories:', this.foodCatagoriesData);
      },
      (error) => {
        console.error('Error fetching food categories:', error);
      }
    );

    this.socketSevice.getFoodItems().subscribe(data => {
      // this.data = data;
      data.unshift({ _id: '1', name: 'Add Menu' });
      console.log(data, 'data');
      this.foodeItemsData = data
      if(this.foodCatagoriesIdandName?._id){
        console.log(data,'data after condition');
        console.log(this.foodeItemsData,'foodeItemsData');
        
        let d = data.filter((d: any) => d?.category?._id == this.foodCatagoriesIdandName?._id);
        console.log(d,'d befor push');
        
        d.unshift({ _id: '1', name: 'Add Menu' });
        console.log(d,'d after push');
        this.foodeItemsDataFilterData = d
      }else{
        this.foodeItemsDataFilterData = data
      }
    });
  }

  getFoodList(data: any) {
    this.foodCatagoriesIdandName = data
    let d = this.foodeItemsData.filter((d: any) => d?.category?._id == this.foodCatagoriesIdandName._id);
    d.unshift({ _id: '1', name: 'Add Menu' });
    this.foodeItemsDataFilterData = d
  }
  functionItem(d: any) {
    // if(this.userFormDataStatu){
    //   this.userFormDataStatu=false
    // }
    // this.userFormDataStatu=true
    this.userFormDataStatu=!this.userFormDataStatu

    if (d._id == 1) {
      if(this.foodCatagoriesIdandName?._id){
        this.userformData = {
          name: '',
          categoryId: this.foodCatagoriesIdandName?._id,
          categoryName: this.foodCatagoriesIdandName?.name,
          price: 0,
          image: null,
          type: '',
          shortcode: ''
        };
        this.imagePreview = null;
      }else{
        this.userformData = {
          name: '',
          categoryId: '',
          categoryName: '',
          price: 0,
          image: null,
          type: '',
          shortcode: ''
        };
        this.imagePreview = null;
        alert('select category first')
      }
    } else {
      this.userformData = {
        name: d.name,
        categoryId: d.category._id,
        categoryName: d.category.name,
        price: d.price,
        image: d.img,
        type: d.type,
        shortcode: d.shortcode
      };
      this.imagePreview = this.userformData.image;
    }
    console.log(d);
  }
  submitForm() {
    if (!this.userformData.name || !this.userformData.categoryId || !this.userformData.price) {
      console.error('Missing required form data');
      return;
    }

    const formDataToSend = new FormData();
    const requestBody = {
      name: this.userformData.name,
      category: this.userformData.categoryId,
      price: this.userformData.price,
      type: this.userformData.type,
      shortcode: this.userformData.shortcode,
    };
    if (this.userformData.image) {
      formDataToSend.append('image', this.userformData.image);
      formDataToSend.append('name', this.userformData.name);
      formDataToSend.append('category', this.userformData.categoryId);
      formDataToSend.append('price', this.userformData.price.toString());
      formDataToSend.append('type', this.userformData.type);
      formDataToSend.append('shortcode', this.userformData.shortcode);
    } else {
      console.error('No image selected!');
      return;
    }
    // console.log('click submit ');
    
    this.socketSevice.updateFoodItems(formDataToSend, requestBody).subscribe(
      res => {
        console.log('Successfully added food item:', res);
      },
      err => {
        console.error('Error occurred:', err);
      }
    );
  }

  // Method to handle image change (editable image)
  updateImage(event: any) {

    const file = event.target.files[0];

    if (file) {

      // Convert the selected file to a base64 string or upload to a server
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.formData.img = reader.result as string;  // Update img field
        this.imagePreview = reader.result as string;
        // this.cdRef.detectChanges();
        event.target.value = '';

      };
      console.log(this.imagePreview, 'imagePreview');
      // If you'd like to track the progress or handle errors:
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      // event.target.value = '';  
    }
    this.userformData.image = file;
  }
  onImageClick() {
    console.log('Image preview clicked!');  // Debugging log
    console.log(this.imageInputRef, 'this.imageInputRef');
    let fileInput = document.getElementById('imageInput');
    // if (this.imageInputRef) {
    //   this.imageInputRef.nativeElement.click();
    // } else {
    //   console.log('imageInputRef is undefined!');
    // }
    if (fileInput)
      fileInput.click();
    else
      console.log('ERROR: cannot find file input');

  }


}
