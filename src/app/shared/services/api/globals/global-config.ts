
export const BaseURL = "http://188.225.184.107:9091";
export const API_URL = BaseURL+'/api/Account';
export const EZIAPI_URL = BaseURL+'/api';

export class END_POINTS {
    // Eliyaa API
    public static login = API_URL+"/login";
    public static users = API_URL+"/users";
    public static cities = EZIAPI_URL+"/Cities";
    public static customers = EZIAPI_URL+"/Customers";
    public static customersFiltered = EZIAPI_URL+"/Customers/Filtered";
    public static customersExport = EZIAPI_URL+"/Customers/ExportPDF";
    public static customersExporExcel = EZIAPI_URL+"/Customers/ExportExcel";





    public static customerTypes = EZIAPI_URL+"/CustomerTypes";
    public static subscriptionStatus = EZIAPI_URL+"/SubscriptionStatus";
    public static subscriptionTypes = EZIAPI_URL+"/SubscriptionTypes";








}


