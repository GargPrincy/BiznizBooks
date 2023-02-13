import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { BookListingComponent } from './book-listing/book-listing.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesComponent } from './categories/categories.component';
import { BooksComponent } from './books/books.component';
import { ViewAllComponent } from './view-all/view-all.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookListingComponent,
    CategoriesComponent,
    BooksComponent,
    ViewAllComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    NgbModule,
    AppRoutingModule,
    CarouselModule
  ],
  exports:[
    RouterModule
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
