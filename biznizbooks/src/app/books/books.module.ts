import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';

// import { PdfViewerModule } from 'ng2-pdf-viewer';

import { BooksComponent } from './books.component';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SocialLoginModule } from '@abacritt/angularx-social-login';



@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    NgbTooltipModule,
    // PdfViewerModule,
    BooksRoutingModule,
    CarouselModule,
    SocialLoginModule
 
  ]
})
export class BooksModule { }
