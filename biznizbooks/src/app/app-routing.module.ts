import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookListingComponent } from './book-listing/book-listing.component';
import { BooksComponent } from './books/books.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { ViewAllComponent } from './view-all/view-all.component';


const routes: Routes = [
  { path: "",
    component: HomeComponent 
  },
  { path: "book-listings", component: BookListingComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "books", component: BooksComponent },
  { path: "view-all", component: ViewAllComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
