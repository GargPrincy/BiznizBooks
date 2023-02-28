import { environment } from "src/environments/environment";



export class API {
    public static apiBaseUrl = environment.apiBaseUrl;

    public static home = {
        getAllData: API.apiBaseUrl + "home"                
    }
    public static categories = {
        getAllData: API.apiBaseUrl + "categories",
        getCategoryDetails: API.apiBaseUrl + "category/{categoryId}",
        getAllBookListing: API.apiBaseUrl + "biznizbook/search/{bookSearchKey}",
        getAllBookListingViewAll: API.apiBaseUrl + "biznizbook/secondarysearch/{bookSearchKey}",
        getBookDetails: API.apiBaseUrl + "biznizbook/details/{bookParamId}",
        getTopBook: API.apiBaseUrl + "today-top-biznizbook",
        getTopBookAll: API.apiBaseUrl + "secondary-today-top-biznizbook",
        // reportSlideMissing: API.apiBaseUrl + "biznizbook/missing-report/{bookParamId}",
        updateBookDownloadCounts: API.apiBaseUrl + "biznizbook/download/{bookParamId}",
    }
    public static social = {
        socialLogin: API.apiBaseUrl + "social-login",               
    }
}