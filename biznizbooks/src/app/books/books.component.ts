import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
const FileSaver = require('file-saver');
import { SocialAuthService , SocialUser ,FacebookLoginProvider, GoogleLoginProvider, GoogleInitOptions } from  '@abacritt/angularx-social-login';

import { BookListingsService } from 'src/services/book-listings/book-listings.service';
import { HomeService } from 'src/services/home/home.service';
declare var $: any;

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  public bookData:any = [];
  public downloadsData:any;
  public slideId:string="";
  public errors:any;
  public bookThumbnails:any = [];
  public slideurl:any ={};
  public imageSrc:string="";
  // pops:false;
  // public slideCliecked = 2;
  public bookEmbed:string = "";
  page: number = 1;
  totalPages: number = 0;
  imageIten:number = 0;
  lastItem:any;
  // lastItemView:any;
  public showGuestUserBooks:any = "";
  public guestDownloadBook:any = "";
  public socialToken:any = "";
  public socialEmailBook:any = "";
  isLoaded: boolean = false;
  public downCountBook: number = 0;
  limitDown: number = 10;
  public slideIdss : any;
  public downloadCountBook:number = 0;
  public isLoggedin: boolean = false;
  public user!: SocialUser;
  socialUser!: SocialUser;
  public socialAllData:any = [];
  // public showModalLast:boolean=false;
  popup = false;
  
  BooksThumbnail: OwlOptions = {
    autoplay: false,
    rewind: false /* use rewind if you don't want loop */,
    margin: 10,    
    // items:5, 
    // slideBy:4,
    loop:false,       
    dots:false,    
    autoWidth:false,    
    autoHeight:false,
    startPosition: 1,        
    slideTransition:'linear',
    navText:["   <span class='slide-left'> <img src='assets/images/arrow-left.png' width='59px' alt='arrow-left arrow-a'>  </span>","<span class='slide-right'><img src='assets/images/arrow-right.png' width='59px' alt='arrow-right arrow-a'> </span>"],
    animateOut: 'fadeOut', 
    animateIn: 'fadeIn',
    navSpeed:60,
    responsive: {
      0: {
        items:2,
        slideBy:2,
      },
      420: {
        items:3,
        slideBy:5,
      },
      575: {
        items:5,
        slideBy:6,
      },
      992: {
        items:8,
        slideBy:8,
      },
      1200: {
        items:10,
        slideBy:10,
        nav:true
      }
    },
    nav: true,
    stagePadding:1
  };

  BooksThumbnails: OwlOptions = {
    autoplay: false,
    rewind: false /* use rewind if you don't want loop */,
    margin:10,
    loop:false,      
    dots:false,    
    autoWidth:false,  
    navSpeed:100,  
    autoHeight:false,       
    navText:["   <span class='slide-left'> <img src='assets/images/arrow-left.png' width='59px' alt='arrow-left arrow-a'>  </span>",
    "<span class='slide-right'><img src='assets/images/arrow-right.png' width='59px' alt='arrow-right arrow-a'> </span>"],
    animateOut: 'fadeOut', 
    animateIn: 'fadeIn',
    items:1,
    nav: true,
    stagePadding:1,
    mouseDrag  : false,
  };
  
public modalShoiw:boolean=false;
  constructor(
    private activatedRoute: ActivatedRoute,
      private _bookListingService: BookListingsService,
      private titleService: Title,
      private _homeService: HomeService,
      private authService: SocialAuthService, 
  ) {
    console.log('hi-constructor')
   }

  ngOnInit() {
    
    [].slice.call(document.querySelectorAll('book')).forEach(function(audio:any) {
      audio.muted = true;
  });

  console.log($('#BooksThumbnails').find('.owl-next.disabled').closest('.owl-nav').length, '<ngoinittttttttttinittttt---->>>')
  console.log('hi-ngointit')
    this.activatedRoute.queryParams.subscribe(params => {
      const slideId = params['bookParamId'];
      const id = this.activatedRoute.snapshot.paramMap.get('bookParamId');
      const userId:any = this.activatedRoute.snapshot.paramMap.get('bookParamId')?.toString();

      if(this.socialEmailBook == "" || this.socialEmailBook == null) {
        this.socialEmailBook = localStorage.getItem('socialEmailBook');
      } 

      console.log(params,userId,id);  
      if(this.guestDownloadBook == "" || this.guestDownloadBook == null) {
        this.guestDownloadBook = localStorage.getItem("guestBookDownload");
      }

      let slideIds:number = parseInt(userId)

      this.slideIdss = parseInt(userId)
      this.getData(slideIds);
      const tag = document.createElement('script');
      console.log(tag, 'tag-princy')
      // tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    });

    // if(localStorage.getItem("socialEmailBook") != '' || localStorage.getItem("socialEmailBook") != null){
    //   console.log('ngafterviewinit---->>ifffffffffffffffff');
    //     this.showGuestUserBooks = localStorage.getItem("guestUserNameBizniz");
    //   }
     console.log(localStorage.getItem("socialEmailBook"), 'princy-loginnn') 
    if(localStorage.getItem("socialEmailBook") === null) {
      // this.socialToken = localStorage.getItem('tokensocialBook');
      console.log('userssss-loggedinn-slideess', this.socialToken)
        this.authService.authState.subscribe((user) => {
          console.log('userssss-slideess')
            this.user = user;
            
            this.isLoggedin = (user != null);
            console.log(this.user, 'user-name-slideess');
            console.log( this.isLoggedin , 'isLoggedin -name');
            if(user != null){
              this.postGoogleData(this.user);
            }
          });
        }

   //
   }

   public shareVideoCopytext(textShare:any){
    console.log(textShare, 'text-share')
    let copyText:any = document.getElementById('ytbUrl');
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    // alert(copyText.value)
    navigator.clipboard.writeText(copyText.value);
  }
  public embedSlideCopytext(textShare:any){
    let copyText:any = document.getElementById('embedUrl');
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    // alert(copyText.value)
    navigator.clipboard.writeText(copyText.value);
  }

  ngAfterViewChecked() {
     
    // if(this.showGuestUserBooks == "" || this.showGuestUserBooks == null) {
      this.showGuestUserBooks = localStorage.getItem("guestUserNameBizniz");
      this.guestDownloadBook = localStorage.getItem("guestBookDownload");
    // }
    // if(this.socialEmailBook == "" || this.socialEmailBook == null) {
      this.socialEmailBook = localStorage.getItem('socialEmailBook');

    // } 

     console.log($('#BooksThumbnails').find('.owl-next.disabled').closest('.owl-nav').length, '<---ngaftervieww---->>>')
     console.log('modal-show', this.modalShoiw)


     if($('#BooksThumbnails').find('.owl-next.disabled').closest('.owl-nav').length == 1 && this.modalShoiw == false){
      // console.log('modal-show', this.modalShoiw)


      $('#LastItem').modal('show');
      this.modalShoiw = true;
      // console.log('modal-show', this.modalShoiw)
     }
     else if($('#BooksThumbnails').find('.owl-next.disabled').closest('.owl-nav').length == 0 && this.modalShoiw == true){
     console.log('modal-show-elseifff', this.modalShoiw)
      this.modalShoiw = false;
     }

    //We loading the player script on after view is loaded
  }

  private getData(slideId:number) {
    console.log('s-priny-gargggggggggggggggggggg', slideId)
    console.log("get token-email",this.socialEmailBook)
    this.socialEmailBook = localStorage.getItem('socialEmailBook');
    
    this._bookListingService.getBookRecord(slideId, this.socialEmailBook).subscribe(
      response => {
      
            this.bookData = response;
            console.log('sssssssssssssssssssssss-ddddddddd', this.bookData)

            // this.downCountBook = this.bookData.user_download_today;
            console.log(this.downCountBook, 'dowen-count')
            
            this.titleService.setTitle(this.bookData.title.toUpperCase());
            console.log(this.bookData.url, 'hhhh-url')
            this.slideId = this.bookData.url;
            this.bookThumbnails = this.bookData.gallery;

            // this.lastItemView = this.bookThumbnails.length-2;
            this.lastItem = this.bookThumbnails.length-1;

            this.imageSrc = this.bookThumbnails[0];

            console.log(this.bookThumbnails, 'bookThumbnails')
            console.log(this.BooksThumbnails.navText, 'nav-----------------Thumbnails')

              this.bookEmbed ="<iframe width='420' height='345' src='"+this.bookData.url+"'></iframe>";
          }
         
    );

  }

  afterLoadComplete(pdf:any,ins:any, ind:number) {
    console.log(ind, 'iii-length')
    console.log(ins, 'iii-inssddd')
    this.imageSrc = ins;
    this.BooksThumbnails = { ...this.BooksThumbnails, startPosition : ind}
    if(this.lastItem == ind){
      console.log('item-last-item')
      $('#LastItem').modal('show',{ backdrop: "static ", keyboard: false });
      // alert('hi length over there sldier')
    }
  }

  // nameChanged(e:any){
  //   console.log('<----------main-view-evenr------>',e)
  //   // console.log(ifn, 'load')
  //   console.log(this.lastItemView, '<---------main-view-lastitem----->')


    // console.log($('owl-carousel-o').find('.owl-next').closest('.owl-nav').find(".disabled").length, '<<<<length is changes')
    // console.log($(document).find('owl-carousel-o').find('.owl-next').closest('.owl-nav').find(".disabled").length, '<<length is changes- toooooo>>')
    // console.log($('#BooksThumbnails').find('.owl-next.disabled').closest('.owl-nav').length, '<<length is with books-idd- toooooo>>')

    // if(this.lastItemView == e.startPosition){
    //   console.log('<--main-view-lastitem----->')
      // console.log($('owl-carousel-o').find('.owl-next').closest('.owl-nav').find(".disabled").length, '<<<<<<<<enght--->>>after')
      // console.log($('#BooksThumbnails').find('.owl-next.disabled').closest('.owl-nav').length, '<<<lenght---->>>after')

      // if($('#BooksThumbnails').find('.owl-next.disabled').closest('.owl-nav').length == 1){
      //   console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<next>>>>>>>>>>>>>>>>>>>>>>>>>>>')

      //   // $('#LastItem').modal('show',{ backdrop: "static ", keyboard: false }); 
      // }
      
  //   }
  //   // })
  // }

  downloadBook(slideId:number) {
    console.log("get data",slideId)
    console.log("get downloadCount",this.downCountBook)
    // console.log("get token-download",this.socialToken)
    console.log("get book-email",localStorage.getItem('socialEmailBook'))
    this.socialEmailBook = localStorage.getItem('socialEmailBook');

    console.log("get token-email",this.socialEmailBook)

        if(this.socialEmailBook != null){
          console.log('hdfjhk-email-book')
          this._bookListingService.updateBookDownloadCount(slideId, this.socialEmailBook).subscribe(
            response => {  
              console.log('afterrrrrrrrrrrrrrr-clieckk', response);
              this.downloadsData = response;
              this.downCountBook = this.downloadsData.user_download_today;
              if(this.downloadsData.user_download_today <= 10){
                console.log('gii-before-10')

                FileSaver.saveAs(this.bookData.url, this.bookData.slug);
                this.bookData.download_count = parseInt(this.bookData.download_count)+1;
                this.getData(slideId);
                console.log(this.limitDown, 'limit-doen')
                this.downloadCountBook = this.limitDown - this.downCountBook;
                
                console.log('wwwww', this.downloadCountBook);
  
                // alert('hi')
              }
              // else{
              //   alert('ggggggg')
              // }
              
             
              
            },error => {
              this.errors = error.status;
              console.log( this.errors, 'erroee--generateee')
              // alert(error.error.message)
            });
        }
  }

  signInWithFB(): void {
    const fbLoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'email,public_profile',
      auth_type: 'rerequest'
    };

    let facebookProvider = FacebookLoginProvider.PROVIDER_ID;

      this.authService.signIn(facebookProvider).then(data => {
        console.log(data, 'data');

         var socialObj = { 
          "name" : data.response.name, 
          "email" : data.response.email,
          "id"  : data.response.id 
        }

        console.log(socialObj, 'social-object')

        this._homeService.postSocialRecord(socialObj).subscribe(respon => {
              console.log("post social",respon)
              this.socialAllData = respon;
              localStorage.setItem("tokensocialBook", this.socialAllData.token);
              localStorage.setItem('guestUserNameBizniz', this.socialAllData.name);
              localStorage.setItem('socialEmailBook', this.socialAllData.email);
              // localStorage.setItem('socialId', this.socialAllData.id);
              let slideIdssDownload:number =  this.slideIdss;
              this.downloadBook(slideIdssDownload)
          }
        );

        console.log("princygargarag")
      });
  }


  postGoogleData(user:any){
    console.log('fhjkh-user-slides', user)
    
    var socialgoogle = { 
      "name" : user.name, 
      "email" : user.email
    }

    this._homeService.postSocialRecord(socialgoogle).subscribe(respon => {
      console.log("post social",respon)
      this.socialAllData = respon;
      localStorage.setItem("tokensocialBook", this.socialAllData.token);
      this.showGuestUserBooks = localStorage.setItem('guestUserNameBizniz', this.socialAllData.name);
      this.socialEmailBook = localStorage.setItem('socialEmailBook', this.socialAllData.email);
      // localStorage.setItem('socialId', this.socialAllData.id);
      this.showGuestUserBooks = localStorage.getItem("guestUserNameBizniz");
      let slideIdssDownload:number =  this.slideIdss;
      this.downloadBook(slideIdssDownload)
  });

  }
}
