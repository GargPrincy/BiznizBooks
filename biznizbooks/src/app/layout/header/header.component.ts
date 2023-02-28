import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {Router,Event,RoutesRecognized} from '@angular/router';
import * as jQuery from 'jquery';
import { SocialAuthService , SocialUser  } from  '@abacritt/angularx-social-login';

declare var $: any;

import { HomeService } from 'src/services/home/home.service';
import { BookListingsService } from 'src/services/book-listings/book-listings.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public myForm: FormGroup;

  registerForm!: FormGroup;
  submitted = false;
  
  public homeAllData:any = [];
  public socialAllData:any = [];
  public showGuestUserBooks:any = "";  
  public socialTokenBook:any = "";

  public categoriesAllData:any = [];
  public catId:number=1;

  public showData = 0;
  public showModelPopup:boolean=false;
  public user!: SocialUser;
  socialUser!: SocialUser;
  public isLoggedin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private _homeService: HomeService,
    private _bookListingService: BookListingsService,
    private authService: SocialAuthService,
    // private globalfromGlobals: Globals
  ) {
    this.homeAllData = [];
    this.socialAllData = [];
    this.myForm = this.fb.group({
      name:  [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.pattern(/^[A-Za-z]+$/),
        ],
      ],
    });

  }


  checkoutForm = this.formBuilder.group({
    searchKey: ''
  });
  forms = new FormGroup({

    categories: new FormControl('')

  });

  playAudio(){
    let audio = new Audio();
    audio.src = "./assets/audios/click.wav";
    audio.load();
    audio.play();
  }
  pauseAudio() {
    let audio = new Audio();
    audio.src = "./assets/audios/click.wav";
    audio.load();
    audio.pause();
 
  }

  public onGoToPage2(){
    this.checkoutForm.reset();
  }

  public onSubmit() {
    console.log('Valid?---', this.checkoutForm); // true or false  this.checkoutForm   
    if(this.checkoutForm.value.searchKey !=""){

      console.log("ay",this.checkoutForm.value);
      let sessionId =   this.getRandomIntInclusive(1,9999999999);
      let navigationExtras = {
        queryParams: { 'session_id': sessionId , searchKey:this.checkoutForm.value.searchKey},
        fragment: 'anchor'
      };
  
      // Navigate to the login page with extras
      this.router.navigate(['/book-listings',this.checkoutForm.value.searchKey]);
      // if(this.checkoutForm.value.searchKey !="" ){
        const searchValue:any = this.checkoutForm.value.searchKey
        this.getAllBookListing(searchValue);
      // }

    }
  }

  public getAllBookListing(searchKeyword:string) {
    this._bookListingService.getBookRecords(searchKeyword).subscribe(
      response => {
          console.log("get searchhhh header",response)
          // if (response.body?.isSuccess) {
          this.categoriesAllData = response;
      
          this.showData = 1;  
      }
    );
  }

  get myFormControl() {
    return this.myForm.controls;
  }

  public getRandomIntInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

  private getData() {
    this._homeService.getHomeRecords().subscribe(
      response => {
        console.log("get data",response)
       // if (response.body?.isSuccess) {
          this.homeAllData = response;
        //}
      }
    );
  }

  ngOnInit() {
    this.router.events.subscribe((event:Event) => {
      if (event instanceof RoutesRecognized) {


       let cateIds = parseInt(event.state.root.firstChild?.params["categoryId"]);
       if(isNaN(cateIds)){
        this.catId = 0;
       } else {
        this.catId = event.state.root.firstChild?.params["categoryId"];
       }
      console.log(this.catId,'princy-actaid');

      let soundStatusCheck = localStorage.getItem("soundPropBizniz");
      if(soundStatusCheck ==null ||  soundStatusCheck ==undefined ||  soundStatusCheck == "" ||  soundStatusCheck == ""){
        this.playAudio();
        console.log("if"); 
        setTimeout(function(){   
          $("#checkkkd").prop('checked', true); 
        },800) 
      } else if( soundStatusCheck == "1" ) {
        this.playAudio();
        console.log("if");   
        setTimeout(function(){
          $("#checkkkd").prop('checked', true); 
        },800) 
      } else if( soundStatusCheck == "2" ) {
        this.pauseAudio();
        console.log("if");    
        setTimeout(function(){   
          $("#checkkkd").prop('checked', false); 
        },800) 
      }else {
        console.log("elsessss111");
        this.playAudio();
        //$("#offBtn").css("display", "block");
        //$("#onBtn").css("display", "none");
      }
      console.log(soundStatusCheck,"sound-check-status");
      
    }
  });
    this.getData();
    // this.socialTokenBook = localStorage.getItem('tokensocialBook');
    // console.log(this.socialTokenBook, 'token-social')

    if(localStorage.getItem("socialEmailBook") != '' || localStorage.getItem("socialEmailBook") != null){
      console.log('ngafterviewinit---->>ifffffffffffffffff');
        this.showGuestUserBooks = localStorage.getItem("guestUserNameBizniz");
      }

      if ((this.showGuestUserBooks == '' || this.showGuestUserBooks == null) && localStorage.getItem("socialEmailBook") === null) {

        this.showModelPopup=true;
        this.openModelData();
      }

    // if (this.socialTokenBook == null && localStorage.getItem("socialEmailBook") === null) {
    //   this.isLoggedin == false;
    // }
  /*if(!this.isLoggedin && this.socialTokenBook == null) {

  console.log('userssss-loggedinn')
    this.authService.authState.subscribe((user) => {
      console.log('userssss')
        this.user = user;
        
        this.isLoggedin = (user != null);
        console.log(this.user, 'user-name');
        console.log( this.isLoggedin , 'isLoggedin -name');
        if(user != null){
          this.postGoogleData(this.user);
        }
      });
    } *//**/  
  
  }
  ngAfterViewChecked(){
    this.socialTokenBook = localStorage.getItem('tokensocialBook');

    // this.showGuestUserBooks = localStorage.getItem("guestUserNameBizniz");      
    console.log(this.socialTokenBook, 'token-social')
    //this.showGuestUserBooks == ' ' || this.showGuestUserBooks == null) && localStorage.getItem("socialEmailBook") === null
    if ((this.showGuestUserBooks == ' ' || this.showGuestUserBooks == null) && localStorage.getItem("socialEmailBook") === null) {
      //...
      console.log('isLoggedinbbb-name');
      
      // localStorage.setItem('guestUserName', "GuestUser");
      this.showModelPopup=true;
      this.openModelData();
    }

    if(localStorage.getItem("socialEmailBook") != null){
      console.log('ngafterviewinit---->>ifffffffffffffffff');
        this.showGuestUserBooks = localStorage.getItem("guestUserNameBizniz");
      }
  }


  public userFormSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false     
    this.submitted = true; 
    if(form.valid){
      if(form.value.name  == "" || form.value.name  == null){
        // localStorage.setItem('guestUserName', "GuestUser" );
        this.showGuestUserBooks =  form.value.name.trim();
        // this.globalfromGlobals.showGuestUserBooks = this.showGuestUserBooks;      
      }else{
        console.log('form-triem-241', form.value.name.trim())
        // localStorage.setItem('guestUserNameBizniz',  form.value.name.trim());
        this.showGuestUserBooks =  form.value.name.trim();
        localStorage.setItem('guestBookDownload',  form.value.name.trim()); 
        console.log('form-triem-241', this.showGuestUserBooks)
  

      }
      this.hidePopup();
      this.onReset();
    }
  }


  postGoogleData(user:any){
    console.log('fhjkh-user', user)
    
    var socialgoogle = { 
      "name" : user.name, 
      "email" : user.email
    }

    this._homeService.postSocialRecord(socialgoogle).subscribe(respon => {
      console.log("post social",respon)
      this.socialAllData = respon;
      localStorage.setItem("tokensocialBook", this.socialAllData.token);
      this.showGuestUserBooks = localStorage.setItem('guestUserNameBizniz', this.socialAllData.name);
      localStorage.setItem('socialEmailBook', this.socialAllData.email);
      // localStorage.setItem('socialId', this.socialAllData.id);
      this.showGuestUserBooks = localStorage.getItem("guestUserNameBizniz");
  }
);
if(this.isLoggedin == true) {
  // console.log('naigate', this.user)
  this.router.navigate(['/']);
}
  }

  signOut(): void {
    console.log('signout-280')
    localStorage.removeItem("tokensocialBook");
    this.showGuestUserBooks = localStorage.removeItem('guestUserNameBizniz');
    console.log('fjklklklklklklklklklklklkl', this.showGuestUserBooks)
    // this.showGuestUserBooks = '';
    localStorage.removeItem('socialEmailBook');
    if (this.showGuestUserBooks == null || this.showGuestUserBooks == '') {
      //...
      console.log('isLoggedinbbb-name-2889');
      
      // localStorage.setItem('guestUserName', "GuestUser");
      this.showModelPopup=true;
      this.openModelData();
    }
    this.authService.signOut();
    
  }


  onReset() {
    this.submitted = false;
    this.myForm.reset() 
}
  hidePopup(){
    jQuery(".popup-close").click();
  }

  openModelData() { 
    // this.showGuestUserBooks = localStorage.getItem("guestUserNameBizniz");  
    console.log(this.showGuestUserBooks, 'guest-namee')    
    if(this.showGuestUserBooks == "" || this.showGuestUserBooks == null) {
      console.log("aya h");
      $('#raunds-row-modals').modal('show',{ backdrop: "static ", keyboard: false });

    }    
  }

}
