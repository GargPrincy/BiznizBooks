import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { BooksModule } from './books/books.module';
import { LayoutModule } from './layout/layout.module';

import { BookListingComponent } from './book-listing/book-listing.component';
import { CategoriesComponent } from './categories/categories.component';
// import { BooksComponent } from './books/books.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { SearchComponent } from './search/search.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { TopicListingComponent } from './topic-listings/topic-listings.component';


@NgModule({
  declarations: [
    AppComponent,
    BookListingComponent,
    CategoriesComponent,
    SearchComponent,
    PagenotfoundComponent,
    // BooksComponent,
    ViewAllComponent,
    CategoryListingComponent,
    CategoryViewComponent,
    TopicListingComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    CarouselModule,
    BooksModule
  ],
  exports:[
    RouterModule
  ],  
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
          //  provider: new GoogleLoginProvider('308041842089-utsn90t5mu6s442r7j7htpvbdbll5t18.apps.googleusercontent.com')
           //  provider: new GoogleLoginProvider('192654719663-97kq740ii1lcbl0buqiv8e51624c28tp.apps.googleusercontent.com')  demo server
           provider: new GoogleLoginProvider('494132189522-i6f6l1s9vrkjffu9cfoo3f9k6pn01uio.apps.googleusercontent.com')  //live server
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            // provider: new FacebookLoginProvider('739091271259555')  demo server
            provider: new FacebookLoginProvider('739091271259555') //live server
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
