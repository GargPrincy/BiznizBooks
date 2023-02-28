import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { HttpService } from "../common/http.service";
import { HomeList } from '../../models/common/home/home-list.model';
import { Dictionary } from "src/models/common/dictionary";


import { API } from "src/config/api";

@Injectable({
  providedIn: 'root'
})
export class BookListingsService {
  private categoryeData:any;

  constructor(    private readonly _httpService: HttpService
    ) {    this.categoryeData = []; }
  public getCategoryRecords() {
    return this._httpService.get<HomeList[]>(API.categories.getAllData)
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryeData = r.body.data ?? [];
              }
              return this.categoryeData;
            })
        );
  }
  
  public getBookRecords(searchKeyword:string) {
    var param = new Dictionary<any>();
    param.add("searchKey", searchKeyword)
    console.log(searchKeyword,"john");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getAllBookListing.replace('{bookSearchKey}', searchKeyword.toString()))

        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];

              }
              return this.categoryeData;
            })
        );
  }
  public getBookRecordsViewAll(searchKeyword:string) {
    var param = new Dictionary<any>();
    param.add("searchKey", searchKeyword)
    console.log(searchKeyword,"john");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getAllBookListingViewAll.replace('{bookSearchKey}', searchKeyword.toString()))
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];

              }
              return this.categoryeData;
            })
        );
  }
  public getBookRecordsViewAllPagination(searchKeyword:string) {
    var param = new Dictionary<any>();
    param.add("searchKey", searchKeyword)
    console.log(searchKeyword,"john");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(searchKeyword)
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];

              }
              return this.categoryeData;
            })
        );
  }
  public getTopBookRecord() {

    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getTopBook)
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];
              }
              return this.categoryeData;
            })
        );
  }
  public getTopBookRecordAll() {

    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getTopBookAll)
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.ok == true ){
                 this.categoryeData.data = r?.body?.data ?? [];
                 this.categoryeData.total = r?.body ?? [];
              }
              return this.categoryeData;
            })
        );
  }
  
  public getBookRecord(slideId:number, emailSocial:any):Observable<HomeList[]> {
    var param = new Dictionary<any>();
    param.add("searchKey", slideId)
    console.log(slideId,"dfsdf");
    console.log("token-slide-detail", emailSocial);
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.getBookDetails.replace('{bookParamId}', slideId.toString()+ "?email="+ emailSocial))
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryeData = r.body.data ?? [];
                //  const downlaodd = new Blob([this.categoryeData.blob()], { type: 'application/pdf' })
              }
              return this.categoryeData;
            })
        );
  }
  public updateBookDownloadCount(slideId:number, emailSocial:any):Observable<HomeList[]> {
    var param = new Dictionary<any>();
    param.add("searchKey", slideId)
    console.log("token-idididid", emailSocial);
    console.log(slideId,"dfsdf");
    //const searchDataSend = {"searchKey":searchKeyword};
    return this._httpService.get<HomeList[]>(API.categories.updateBookDownloadCounts.replace('{bookParamId}', slideId.toString() + "?email="+ emailSocial))
        .pipe(
            map( r => {
              console.log("in services",r);
              if (r.body?.status){
                 this.categoryeData = r.body.data ?? [];
              }
              return this.categoryeData;
              // return new Blob([this.categoryeData.blob()], { type: 'application/pdf' });
            })
        );
  }

}
