import { Component } from '@angular/core';
import { CategoriesService } from 'src/services/categories/categories.service';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  public categoriesAllData:any = [];

  constructor(
    private _categoryService: CategoriesService,
    private titleService: Title
  ){
    this.titleService.setTitle("Categories");
  }

  ngOnInit() {
    this.titleService.setTitle("Categories");
    this.getData();  
  }

  private getData() {
    this._categoryService.getCategoryRecords().subscribe(
      response => {
          console.log("get data",response)
          this.categoriesAllData = response;
          console.log( this.categoriesAllData, 'cate-response')
          // this.totalSlide = this.categoriesAllData.totalSlides;
          // console.log(this.totalSlide, 'total-topic')
      }
    );
  }

  showTopic(id:number){
    console.log(id,"ddddd");
    $("#"+id).toggle("slow")

  }

}
