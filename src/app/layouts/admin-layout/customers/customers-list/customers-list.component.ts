import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Config } from 'protractor';
import { Cities, FilterParams, AllCustomers, SubscriptionStatus, SubscriptionTypes, CustomerTypes } from 'app/shared/models';
import { SwalService } from 'app/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { CustomersService } from 'app/shared/services/api/customers.service';
import { Router } from '@angular/router';
import { SubscriptopnStatusService, CitiesService, SubscriptopnTypesService, CustomerTypesService } from 'app/shared/services/api';
import { DateService } from 'app/shared/services/date.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  @ViewChild('table', { static: false }) table: ElementRef;


  iconclearCity: boolean = false;
  iconclearCustomer: boolean = false;
  iconclearSubS: boolean = false;
  iconclearSubT: boolean = false;
  mainSearch: boolean = false;


  customers: boolean = true;
  isRecevied: boolean = false;
  term = '';
  p: any;
  datatable: string;
  //main-object

  //
  value: string;
  cityName: string;
  subscripetypes: string;
  customerTypes: string;
  myDate = new Date();
  datenow: string;
  Days: any;
  Rate: any;
  customer: AllCustomers;
  customerItem: AllCustomers[] = [];
  customerBackup: AllCustomers;


  //
  CITY = '';
  CUSTOMERTYPES = '';
  SUBT = '';
  SUBS = '';


  formSubmitted: boolean = false;

  editObj: AllCustomers = new AllCustomers();
  index: number

  fileName = 'Eleyaa.xlsx';


  SubscriptionStatusItem = new SubscriptionStatus();
  SubscriptionStatus: SubscriptionStatus[] = [];


  CityItem = new Cities();
  City: Cities[] = [];

  customerNameDisplay: string;

  SubscriptionTypesItem = new SubscriptionTypes();
  SubscriptionTypes: SubscriptionTypes[] = [];

  customerTypesList: CustomerTypes[] = [];


  // dropdown filter  -- page permission
  filterParams = new FilterParams();
  searchTimeout: any;
  queryString: string = '';
  collection = [];


  ContractNo: boolean = true;
  Name: boolean = true;
  PhoneNumber1: boolean = true;
  PhoneNumber2: boolean = true;
  PhoneNumber3: boolean = true;
  Address: boolean = true;
  SubscriptionNumbers: boolean = true;
  SubscriptionMonthNumbers: boolean = true;
  SubscriptionDate: boolean = true;

  BottleBalances: boolean = true;
  BottleNumbers: boolean = true;
  city: boolean = true;
  CustomerType: boolean = true;
  Due: boolean = true;
  ReceiptNumbers: boolean = true;
  SubscriptionStatu: boolean = true;
  SubscriptionType: boolean = true;
  Note: boolean = true;
  LastReceipt: boolean = true;
  Price: boolean = true;
  rate: boolean = true;

  AddEdit: boolean = true;



  constructor(private swalService: SwalService,
    private customersServices: CustomersService,
    private route: Router,
    private SubscriptionStatusServices: SubscriptopnStatusService,
    private spinner: NgxSpinnerService,
    private cityServices: CitiesService,
    private subscribetypeService: SubscriptopnTypesService,
    private DateServices: DateService,
    private CustomerTypesServices: CustomerTypesService


  ) {


  }


  ngOnInit(): void {
    this.customer = new AllCustomers();
    this.customerBackup = new AllCustomers();

    this.getAllCustomers();
    this.datatable = 'العملاء';

    this.getPermission();
    this.getdropdown();
  }


  // get all data in tabel 
  getAllCustomers() {

   //
  this.CITY = '';
  this.CUSTOMERTYPES = '';
  this.SUBT = '';
  this.SUBS = '';


   this.iconclearCity  = false;
  this.iconclearCustomer  = false;
  this.iconclearSubS = false;
  this.iconclearSubT  = false;
  this.mainSearch = false;
    this.customersServices.getAll().subscribe(res => {
      this.customerItem = res
    

    })

 

    
  }




  getPermission() {
    let permission = localStorage.getItem('role');
    if (permission == 'Admin') {
      this.AddEdit = true
    } else {
      this.AddEdit = false;
    }
  }

  delete(index: number) {
    this.editObj = { ...this.customerItem[index] }
    this.index = index;
    this.swalService.showRemoveConfirmation(index).then(
      result => {
        if (result.value) {
          this.customersServices.delete(this.editObj.id).subscribe(
            res => {
              this.swalService.Notifier('تم مسح البيانات بنجاح ');
              this.getAllCustomers();

            },
            err => {
              let errorMessage = err.message || ' حدث خطأ اثناء مسح البيانات   ';
              this.swalService.NotifierError(errorMessage)
            }
          )
        }
      }
    );
  }

  //fiter
  filter() {
   this.spinner.show();
    this.customersServices.getAllCustomerFilter().subscribe(res => {
      this.customerItem = res.filter(function (hero) {
        return hero.city == JSON.parse( localStorage.getItem('citydata'));;
        

      });
      this.spinner.hide();

      return this.customerItem;

    })

    this.customersServices.getAllCustomerFilter().subscribe(res => {
      this.customerItem = res.filter(function (hero) {
        return hero.subscriptionStatus == JSON.parse( localStorage.getItem('SUBS'));;
        

      });
      this.spinner.hide();

      return this.customerItem;

    })


    this.customersServices.getAllCustomerFilter().subscribe(res => {
      this.customerItem = res.filter(function (hero) {
        return hero.subscriptionType == JSON.parse( localStorage.getItem('SUBT'));;
        

      });
      this.spinner.hide();

      return this.customerItem;

    })



    this.customersServices.getAllCustomerFilter().subscribe(res => {
      this.customerItem = res.filter(function (hero) {
        return hero.customerType == JSON.parse( localStorage.getItem('CUSTOMERTYPES'));;
        

      });
      this.spinner.hide();

      return this.customerItem;

    })
    this.customersServices.getAllCustomerFilter().subscribe(res => {
      this.customerItem = res

      if (res.length != 0) {
        this.datatable = ' قائمة التسليم '
        this.spinner.hide();

      } else {
        let errorMessage = ' لا توجد بيانات ';
        this.swalService.NotifierError(errorMessage)
        this.spinner.hide();
      }

        this.spinner.hide();
      return this.customerItem;

    })

    }
    
  

  clear() {
    this.term = '';
    this.mainSearch = false;
  }


  clearCity(){
    if (this.datatable == 'العملاء') {
      this.getAllCustomers();
      this.CITY = '';
      this.iconclearCity = false;
      localStorage.removeItem('citydata')
      

    } else {
      this.filter();
      this.CITY = '';
      this.iconclearCity = false;
      localStorage.removeItem('citydata')


    }

  }

  clearCustomer(){

    if (this.datatable == 'العملاء') {
      this.getAllCustomers();
   
      this.CUSTOMERTYPES = '';
      this.iconclearCustomer = false;
      localStorage.removeItem('CUSTOMERTYPES')



    } else {
      this.filter();
      this.CUSTOMERTYPES = '';
      this.iconclearCustomer = false;
      localStorage.removeItem('CUSTOMERTYPES')
     

    }

  }

  clearSubT(){
    if (this.datatable == 'العملاء') {
      this.getAllCustomers();
      this.SUBT = '';
      this.CUSTOMERTYPES = '';
      this.iconclearSubT = false;
      localStorage.removeItem('SUBT')


    } else {
      this.filter();
      this.SUBT = '';
      this.iconclearSubT = false;
      localStorage.removeItem('SUBT')
     

    }

  }
 clearSubS(){
  if (this.datatable == 'العملاء') {
    this.getAllCustomers();
    this.SUBS = '';
    this.iconclearSubS = false;
  
    localStorage.removeItem('SUBS')

  } else {
    this.filter();
    this.SUBS = '';
    this.iconclearSubS = false;
  
    localStorage.removeItem('SUBS')

  }
 }
  
  //get filter city 
  getFilterCity(item: Cities) {
    this.spinner.show();
    this.CITY = item.localText;
    let citynamesearch = this.CITY;
    localStorage.setItem('citydata', JSON.stringify(this.CITY))

    if (this.CITY.length != 0) {
      this.iconclearCity = true;
    } else {
      this.iconclearCity = false;

    }


    if (this.datatable == 'العملاء') {
      this.customersServices.getAll().subscribe(res => {
        this.customerItem = res.filter(function (hero) {
          return hero.city == citynamesearch;

        });
        this.spinner.hide();

        return this.customerItem;

      })
    } else  {
      this.customersServices.getAllCustomerFilter().subscribe(res => {
        this.customerItem = res.filter(function (hero) {
          return hero.city == citynamesearch;

        });
        this.spinner.hide();

        return this.customerItem;

      })
    }
  }

  //get filter substatus 
  getFilterSubscStatus(item: SubscriptionStatus) {
    this.spinner.show();
    this.customer.subscriptionStatusId = item.id;
    this.SUBS = item.localText;
    let subssearch = item.localText
    localStorage.setItem('SUBS', JSON.stringify(this.SUBS))

    if (this.SUBS.length != 0) {
      this.iconclearSubS = true;
    } else {
      this.iconclearSubS = false;

    }



    if (this.datatable == 'العملاء') {
      this.customersServices.getAll().subscribe(res => {
        this.customerItem = res.filter(function (hero) {
          return hero.subscriptionStatus == subssearch;

        });
        this.spinner.hide();
        return this.customerItem;

      })

    } else {

      this.customersServices.getAllCustomerFilter().subscribe(res => {
        this.customerItem = res.filter(function (hero) {
          return hero.subscriptionStatus == subssearch;

        });
        this.spinner.hide();
        return this.customerItem;

      })


    }
  }

  //get filter subsctypes 
  getFilterSubsctypes(item: SubscriptionTypes) {

    this.spinner.show();
    this.customer.subscriptionTypeId = item.id;
    this.SUBT = item.localText;
    const types = this.SUBT
    localStorage.setItem('SUBT', JSON.stringify(this.SUBT))

    if (this.SUBT.length != 0) {
      this.iconclearSubT = true;
    } else {
      this.iconclearSubT = false;

    }



    if (this.datatable == 'العملاء') {
      this.customersServices.getAll().subscribe(res => {
        this.spinner.hide();
        this.customerItem = res.filter(function (hero) {
          return hero.subscriptionType == types;
        });
        this.spinner.hide();
        return this.customerItem;

      })
    } else {

      this.customersServices.getAllCustomerFilter().subscribe(res => {
        this.spinner.hide();
        this.customerItem = res.filter(function (hero) {
          return hero.subscriptionType == types;
        });
        this.spinner.hide();
        return this.customerItem;

      })

    }



  }




  //get filter customer types 
  getFilterCustomerstypes(item: CustomerTypes) {
    this.spinner.show();
    this.customer.customerTypeId = item.id;
    this.CUSTOMERTYPES = item.localText;
    let customerTypes = this.CUSTOMERTYPES
    localStorage.setItem('CUSTOMERTYPES', JSON.stringify(this.CUSTOMERTYPES))

    if (this.CUSTOMERTYPES.length != 0) {
      this.iconclearCustomer = true;
    } else {
      this.iconclearCustomer = false;

    }




    if (this.datatable == 'العملاء') {
      this.customersServices.getAll().subscribe(res => {
        this.customerItem = res.filter(function (hero) {
          return hero.customerType == customerTypes;

        });
        this.spinner.hide();
        return this.customerItem;

      })
    } else {

      this.customersServices.getAllCustomerFilter().subscribe(res => {
        this.customerItem = res.filter(function (hero) {
          return hero.customerType == customerTypes;

        });
        this.spinner.hide();
        return this.customerItem;

      })

    }
  }





  resettabel() {
    this.datatable = 'العملاء'
    this.getAllCustomers();
  }
  //print files

  print() {
    if(    this.datatable == 'العملاء'  ){
      this.customersServices.getPDF('العملاء').subscribe((data) => {
      let blob = new Blob([data], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Customer.pdf";
     window.open(downloadURL, "_blank", 'location=yes,height=600,width=900,scrollbars=yes,status=yes');

      
      link.click();

    }
    )

    } else {
      this.customersServices.getPDF('قائمة التسليم').subscribe((data) => {
        let blob = new Blob([data], { type: 'application/pdf' });
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "Customer.pdf";
     window.open(downloadURL, "_blank", 'location=yes,height=600,width=900,scrollbars=yes,status=yes');
        link.click();
  
      }
      )
    }

  }


  // excel
  Excel() {
    if(  this.datatable == 'العملاء'  ){
     this.customersServices.getExcel('العملاء').subscribe((data) => {
      let blob = new Blob([data], { type: 'application/xlsx' });
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Customer.xlsx";
           window.open(downloadURL, "_blank", 'location=yes,height=600,width=900,scrollbars=yes,status=yes');

      link.click();

        
    }
        )


    } else {

      this.customersServices.getExcel('قائمة التسليم').subscribe((data) => {
        let blob = new Blob([data], { type: 'application/xlsx' });
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "Customer.xlsx";
          window.open(downloadURL, "_blank", 'location=yes,height=600,width=900,scrollbars=yes,status=yes');
        link.click();
  
          
      }
          )
    }

  }



  fill(prop: AllCustomers) {
    this.customer.id = prop.id;
    this.customer.name = prop.name;
    this.customerNameDisplay = this.customer.name
    this.customer.contractNo = prop.contractNo;
    this.customer.phoneNumber1 = prop.phoneNumber1;
    this.customer.phoneNumber2 = prop.phoneNumber2;
    this.customer.phoneNumber3 = prop.phoneNumber3;
    this.customer.address = prop.address;
    this.customer.cityId = prop.cityId;
    this.customer.customerTypeId = prop.customerTypeId;
    this.customer.subscriptionDate = prop.subscriptionDate;
    this.customer.subscriptionNumbers = prop.subscriptionNumbers;
    this.customer.subscriptionMonthNumbers = prop.subscriptionMonthNumbers;
    this.customer.subscriptionTypeId = prop.subscriptionTypeId;
    this.customer.subscriptionStatusId = prop.subscriptionStatusId;
    this.customer.bottleNumbers = prop.bottleNumbers;
    this.customer.price = prop.price;
    this.customer.lastReceipt = prop.lastReceipt;
    this.customer.bottleBalances = prop.bottleBalances;
    this.customer.receiptNumbers = prop.receiptNumbers;
    this.customer.due = prop.due;
    this.customer.note = prop.note;
    this.customer.city = prop.city
    this.cityName = this.customer.city;
    this.customer.subscriptionStatus = prop.subscriptionStatus
    this.value = this.customer.subscriptionStatus;
    this.customer.subscriptionType = prop.subscriptionType;
    this.subscripetypes = this.customer.subscriptionType;
    this.customer.customerType = prop.customerType;
    this.customerTypes = this.customer.customerType;
    this.customer.rate = prop.rate;
    this.Rate = this.customer.rate + "%";



    this.customer.lastReceipt = prop.lastReceipt;
    // To set two dates to two variables 
    var date1 = new Date(this.customer.lastReceipt);
    var date2 = new Date();

    // To calculate the time difference of two dates 
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates 
    this.Days = (Difference_In_Time / (1000 * 3600 * 24)).toFixed(0);

    //savebackup
    localStorage.setItem('customer', JSON.stringify(prop))

  }
  calrate() {
    let result = (this.customer.subscriptionMonthNumbers / this.customer.receiptNumbers);
    this.Rate = "%" + (Number(result) * 100).toFixed(0);

    if (result == null) {
      this.Rate = "%" + 0

    }

  }

  MainSearch(){
    if (this.term.length !=0){
      this.mainSearch =  true;
    } else{
      this.mainSearch = false
    }
  }

  //select from dropdown
  selectStauts(item: SubscriptionStatus) {
    this.customer.subscriptionStatusId = item.id;
    this.value = item.localText;

  }
  selectcity(item: Cities) {
    this.customer.cityId = item.id;
    this.cityName = item.localText;

  }
  selectSubscriptionTypes(item: SubscriptionTypes) {
    this.customer.subscriptionTypeId = item.id;
    this.subscripetypes = item.localText;

  }

  selectcustomertype(item: CustomerTypes) {
    this.customer.customerTypeId = item.id;
    this.customerTypes = item.localText;
  }
  //select date
  selectDate(date) {
    this.customer.subscriptionDate = date.greg;
    let vir = date.hijri

  }
  done() {
    this.customer.lastReceipt = this.DateServices.fromGregorianToGregorianString(new Date());

  }

  //select date
  selectDatelastReceipt(date) {
    this.customer.lastReceipt = date.greg;
    let vir = this.DateServices.fromGregorianToGregorianString(date.greg);
    this.customer.lastReceipt = this.DateServices.fromGregorianToGregorianString(date.greg);

    let days = vir;
    this.datenow = this.DateServices.fromGregorianToGregorianString(this.myDate);

    // To set two dates to two variables 
    var date1 = new Date(this.customer.lastReceipt);
    var date2 = new Date();
    // To calculate the time difference of two dates 
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates 
    this.Days = (Difference_In_Time / (1000 * 3600 * 24)).toFixed(0);

  }

  cancel() {
    this.reset();
  }
  //getdropdowmlist
  getdropdown() {
    // get all data in tabel 
    this.spinner.show();
    this.SubscriptionStatusServices.getAll().subscribe(res => {
      this.SubscriptionStatus = res;
      this.spinner.hide();
    })

    this.spinner.show();
    this.cityServices.getAll().subscribe(res => {
      this.City = res;
      this.spinner.hide();
    })


    this.spinner.show();
    this.subscribetypeService.getAll().subscribe(res => {
      this.SubscriptionTypes = res;
      this.spinner.hide();
    })



    this.spinner.show();
    this.CustomerTypesServices.getAll().subscribe(res => {
      this.customerTypesList = res;
      this.spinner.hide();
    })

  }

  reset() {
    this.customer.id = 0;
    this.customer.name = '';
    this.customer.contractNo = 0;
    this.customer.phoneNumber1 = '';
    this.customer.phoneNumber2 = '';
    this.customer.phoneNumber3 = '';
    this.customer.address = '';
    this.customer.cityId = 0;
    this.customer.city = '';
    this.customer.customerTypeId = 0;
    this.customer.customerType = '';
    this.customer.subscriptionDate = '';
    this.customer.subscriptionNumbers = 0;
    this.customer.subscriptionMonthNumbers = 0;
    this.customer.subscriptionTypeId = 0;
    this.customer.subscriptionType = '';
    this.customer.subscriptionStatusId = 0;
    this.customer.subscriptionStatus = '';
    this.customer.bottleNumbers = 0;
    this.customer.price = 0;
    this.customer.lastReceipt = '';
    this.customer.bottleBalances = 0;
    this.customer.receiptNumbers = 0;
    this.customer.due = 0;
    this.customer.note = '';;
    this.customer.rate = 0;
    this.cityName = '';
    this.value = '';
    this.subscripetypes = ''
    this.customerTypes = '';
    this.Rate = '';
    this.Days = '';
    localStorage.removeItem('customer')

  }

  save() {
    this.customersServices.create(this.customer).subscribe(res => {
      this.swalService.Notifier('تم  الحفظ بنجاح');
      this.reset();
      this.getAllCustomers();
      this.formSubmitted = false;
    }, err => {
      let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })

  }



  saveupdate() {
    this.update();
  }
  update() {
    this.customersServices.update(this.customer.id, this.customer).subscribe(res => {
      this.swalService.Notifier('تم  التعديل بنجاح');
      this.reset();
      if (this.datatable === 'العملاء') {
        this.getAllCustomers();
      } else {
        this.filter();
        this.datatable = " قائمة التسسليم "
      }
      this.formSubmitted = false;

    }, err => {
      let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })

  }
}






