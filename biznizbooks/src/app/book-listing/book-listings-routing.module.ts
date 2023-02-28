import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListingComponent } from './book-listing.component';

const routes: Routes = [
  {
    path: 'book-listings/:bookSearchKey',
    component: BookListingComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookListingsRoutingModule { }
