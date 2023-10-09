import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListingComponent } from './book-listing/book-listing.component';
import { BooksComponent } from './books/books.component';
import { CategoriesComponent } from './categories/categories.component';
// import { HomeComponent } from './home/home.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { SearchComponent } from './search/search.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { TopicListingComponent } from './topic-listings/topic-listings.component';


const routes: Routes = [
  {
    path: "",
    loadChildren:() => import('./home/home.module').then(m => m.HomeModule)
  },

  { path: "categories", 
  component: CategoriesComponent },

  { path: "book-listings/:bookSearchKey", 
    component: BookListingComponent },

    { path: "book-listings", 
    component: BookListingComponent },

  { path: "books/:bookParamId", 
    component: BooksComponent 
  },

  { path: "category-listing/:categoryId", 
    component: CategoryListingComponent 
  },

  {
    path: "category-view/:topicId", component: CategoryViewComponent
  },
  {
    path: "category-view", component: CategoryViewComponent 
  },
  {
    path: "topic-listings/:categoryId/:topicId",
    component: TopicListingComponent 
  },

  { path: "view-all/:bookSearchKey", 
  component: ViewAllComponent },

  { path: "view-all", 
  component: ViewAllComponent },
  
  { path: '**', pathMatch: 'full',component: PagenotfoundComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
