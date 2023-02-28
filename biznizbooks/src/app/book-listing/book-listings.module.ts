import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { BookListingsRoutingModule } from './book-listings-routing.module';
import { BookListingComponent } from './book-listing.component';




@NgModule({
  declarations: [BookListingComponent],
  imports: [
    CommonModule,
    BookListingsRoutingModule,
    ReactiveFormsModule,
    CarouselModule
  ]
})
export class SlideListingsModule { }
