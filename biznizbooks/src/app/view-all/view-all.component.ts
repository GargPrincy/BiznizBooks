import { Component } from '@angular/core';
import { BookListingsService } from 'src/services/book-listings/book-listings.service';
import {Router, ActivatedRoute, NavigationEnd,Event, NavigationStart, NavigationError} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent {
  form = new FormGroup({

    website: new FormControl('')

  });
  public showMore:any;
  public loading:boolean = true;
  public categoriesAllData:any = [];
  public searchWord: any = '';
  public showKeyword:string = "";
  public scrollSuccessfull = false; 
  public showData = 0;



  constructor(
    private _bookListingService: BookListingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title) { 

      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {  }


        if (event instanceof NavigationEnd) {
          this.loading =true;
            // Hide loading indicator
          
            this.scrollSuccessfull = false;
     
        // Show loading indicator
      
          const userId:any = this.activatedRoute.snapshot.paramMap.get('bookSearchKey')?.toString();
          console.log("ayayayysaydyfs",userId);
          const searchKey =userId;
          this.searchWord = searchKey;
        }

        if (event instanceof NavigationError) {
            // Hide loading indicator

            // Present error to user
            console.log(event.error);
            console.log("aya3");
        }
    });

    this.activatedRoute.queryParams.subscribe(params => { 
      const userId:any = this.activatedRoute.snapshot.paramMap.get('bookSearchKey')?.toString();
  
     
      const myArray = userId.split("?");
      const searchKey =userId;
      this.searchWord = myArray[0];
      if (this.searchWord == 'top20s') {  
        this.categoriesAllData.data = [];
        this.titleService.setTitle("Today's Top 20 Books");

      } else if(this.searchWord != ""){
        this.categoriesAllData.data = [];      
        if(myArray[1] == "topic"){
  
          this.showKeyword  = this.searchWord;
          this.titleService.setTitle(this.showKeyword);


        }
        else{
          this.showKeyword =  `Search Results of  "${this.searchWord}"`;
          this.titleService.setTitle(this.showKeyword);

        }     
        

      } 
    });

      setTimeout(()=>{    
        this.loading = false;
      },1400);
    }

    ngAfterViewInit() {
      
      setTimeout(()=>{    
        this.loading = false;
      },1600);
     
      //We loading the player script on after view is loaded
    }

    ngAfterViewChecked() {
      if (!this.scrollSuccessfull) {
      
      setTimeout(()=>{    
        this.loading = false;
      },1600);

    }
     
      //We loading the player script on after view is loaded
    }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => { 
      const userId:any = this.activatedRoute.snapshot.paramMap.get('bookSearchKey')?.toString();
  
     
      const myArray = userId.split("?");
      console.log(myArray,"myArray");
      const searchKey =userId;
      this.searchWord = myArray[0];
      if (this.searchWord == 'top20s') {  
        this.showKeyword =  "Today's Top 20 Books";

        this.categoriesAllData.data = [];
        this.getTopBook();
    
      } else if(this.searchWord != ""){
        this.categoriesAllData.data = [];
        this.getAllBookListing(this.searchWord);
        if(myArray[1] == "topic"){
          this.showKeyword =  this.searchWord;
          this.titleService.setTitle(this.showKeyword);

        }
        else{
          this.showKeyword =  `Search Results of  "${this.searchWord}"`;
          this.titleService.setTitle(this.showKeyword);

        }     

      } 
    });
  }

  private getAllBookListing(searchKeyword:string) {
    console.log(searchKeyword, 'dkd')
    this.categoriesAllData.data = [];
    this._bookListingService.getBookRecordsViewAll(searchKeyword).subscribe(
      response => {
      this.showMore =true;
        console.log("203111",response)
        this.categoriesAllData.data = [...this.categoriesAllData.data ,...response.data];
        //this.categoriesAllData.data.push(response.data);
        this.categoriesAllData.allData = response;
        console.log("205111",this.categoriesAllData.data )
        this.showData = 1;
     // });
     if(response.total.current_page == response.total.last_page){
      this.showMore =false;
     }
   }
      ,
      error => {
        this.categoriesAllData.data = [];
        console.log("226",this.categoriesAllData )
        this.showData = 0; 
           },
    );
  }

  showMoreItems(){
    console.log(186,this.categoriesAllData.allData);
    this._bookListingService.getBookRecordsViewAllPagination(this.categoriesAllData.allData.total.next_page_url).subscribe(
      response => {     
              console.log("203",response)
              this.categoriesAllData.data = [...this.categoriesAllData.data ,...response.data];
              //this.categoriesAllData.data.push(response.data);
              this.categoriesAllData.allData = response;
              console.log("205",this.categoriesAllData.data )
              this.showData = 1;
           // });
           if(response.total.current_page == response.total.last_page){
            this.showMore =false;
           }
      }
      ,
      error => {
        this.categoriesAllData.data = [];
        console.log("226",this.categoriesAllData )
        this.showData = 0; 
        this.showMore =false;
           },
    );
  }
  private getTopBook() {
   
    this._bookListingService.getTopBookRecordAll().subscribe(
      response => {
            console.log("2031",response)
            this.categoriesAllData.data = [...this.categoriesAllData.data ,...response.data];
            //this.categoriesAllData.data.push(response.data);
            this.categoriesAllData.allData = response;
            console.log("2051",this.categoriesAllData.allData )
            this.showData = 1;
            this.showMore =true;
         // });
         if(response.total.current_page == response.total.last_page){
          this.showMore =false;
         }
    }
    );
  }

  get f(){

    return this.form.controls;
  
  }

  BookSort(){  
    console.log("i am in");
    this.showData = 1;
    let vidData = JSON.parse(JSON.stringify(this.categoriesAllData.data));
    this.categoriesAllData.data = [];

    this.categoriesAllData.data = vidData.sort(function (a:any, b:any) {
      return b.download_count - a.download_count;
    });
  
    
    setTimeout(()=>{    
      this.loading = false;
    },100);

  
  }

  BookSortAlpha(){  
    console.log("i am in");
    this.showData = 1;
    let vidData = JSON.parse(JSON.stringify(this.categoriesAllData.data));
    this.categoriesAllData.data = [];

    this.categoriesAllData.data = vidData.sort(function(a:any, b:any){
      var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
      if (nameA < nameB) //sort string ascending
       return -1;
      if (nameA > nameB)
       return 1;
      return 0; //default return value (no sorting)
     });
  
    
    setTimeout(()=>{    
      this.loading = false;
    },100);

  
  }

  
  onChanges(e:any) {
    if(e.target.value == "viewss"){
      this.BookSort();
    }else     if(e.target.value  == "atoz"){
      this.BookSortAlpha();
    }

    console.log(e.target.value);


}

}
