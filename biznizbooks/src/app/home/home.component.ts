import { Component } from '@angular/core';
import { HomeService } from 'src/services/home/home.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public isLoggedin: boolean = false;
  public homeAllData:any = [];
  public subContent:string = "";
  public soundStatus:boolean =true;
  public selected: boolean = false;

  constructor(
    // private authService: SocialAuthService,
    private _homeService: HomeService,
    private titleService: Title,
    private formBuilder: FormBuilder

    ) {     
      this.titleService.setTitle("Bizniz Home");
      this.homeAllData = [];

    //   const fbLoginOptions = {
    //   scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
    //   return_scopes: true,
    //   enable_profile_selector: true
    // }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
    
    // const googleLoginOptions = {
    //   scope: 'profile email'
    // };

   }

   checkoutForm = this.formBuilder.group({
    searchKey: ''
  });  

  get f() { return this.checkoutForm.controls; }

  doAction(event:any){
    console.log(event.target.checked)
    if(event.target.checked == true){
      localStorage.setItem("soundPropBizniz","1" );
    } else if(event.target.checked == false){
      localStorage.setItem("soundPropBizniz","2" );
    }
  }

  ngOnInit() {
    this.titleService.setTitle("Bizniz Home");

   this.getData();

    let soundStatusCheck = localStorage.getItem("soundPropBizniz");

    if(soundStatusCheck ==null ||  soundStatusCheck ==undefined ||  soundStatusCheck == "" ){
      localStorage.setItem("soundPropBizniz","1" );
      this.playAudio();
    }
    console.log(soundStatusCheck, "sound-check-status");
    this.openModelData();
  }

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

  private getData() {
    this._homeService.getHomeRecords().subscribe(
      response => {
          console.log("get data homee",response)
          this.homeAllData = response;
   
        //}
      }
    );
  }

  openModelData() { 
    let soundStatusCheck = localStorage.getItem("soundPropBizniz");
    if( soundStatusCheck == "1" ) {
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
    }
    console.log(soundStatusCheck, "sound-check-status"); 
  }

}
