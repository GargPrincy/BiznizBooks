import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.css']
})

export class BookListingComponent {
    constructor() { }
    customOptions: OwlOptions = {
      autoplay: false,
      rewind: false /* use rewind if you don't want loop */,
      margin: 20,    
      items:5, 
      slideBy:4,      
      dots:false,    
      autoWidth:false,    
      autoHeight:false,       
      slideTransition:'linear',
      navText:["   <span class='slide-left'> <img src='assets/images/arrow-left.png' width='59px' alt='arrow-left arrow-a'>  </span>","<span class='slide-right'><img src='assets/images/arrow-right.png' width='59px' alt='arrow-right arrow-a'> </span>"],
      animateOut: 'fadeOut', 
      animateIn: 'fadeIn',
      navSpeed:100,
      responsive: {
        0: {
          items: 1 
        },
        400: {
          items: 2
        },
        760: {
          items: 3
        },
        1000: {
          items: 4
        }
      },
      nav: true,
      stagePadding:1
    };
}
