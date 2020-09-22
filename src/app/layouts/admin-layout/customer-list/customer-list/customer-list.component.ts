import { Component, OnInit } from '@angular/core';
import { CustomerTypes, FilterParams } from 'app/shared/models';
import { SwalService } from 'app/shared/services';
import { CustomerTypesService } from 'app/shared/services/api/customer-types.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

// search and pagination 
  term='';
  p:any;



  // main object
  customerstypes: CustomerTypes;
  
  // array of tabel 
  customerstypesItem: CustomerTypes[]=[];


  editObj :CustomerTypes = new CustomerTypes();
  index : number

  AddEdit: boolean = true;

      // dropdown filter  -- page permission
      filterParams = new FilterParams();

      // paginatopn array
      collection = [];

    constructor(    private swalService: SwalService,
      private CustomerTypesServices: CustomerTypesService,
      private spinner: NgxSpinnerService
  
      ) { }
  ngOnInit() {
    // init obj
    this.customerstypes = new CustomerTypes();
    this.getAllCustomerTypes();
    this.getPermission();
  }
  // get all data in tabel 
  getAllCustomerTypes(){
    this.spinner.show();
    this.CustomerTypesServices.getAll().subscribe(res=>{
      this.customerstypesItem = res;
      for(let i=1;i<=100;i++){
        let Obj = this.customerstypesItem;
        this.collection.push(Obj);
      this.spinner.hide();
      }
    })
  }


   //fill
  fill(prop: CustomerTypes) {
      this.customerstypes.id = prop.id;
      this.customerstypes.localText = prop.localText;
  }
  reset(){
    this.customerstypes.id = 0;
    this.customerstypes.localText = '';
  }
  save(){
    this.CustomerTypesServices.create(this.customerstypes).subscribe(res =>{
     this.swalService.Notifier(' تم الحفظ بنجاح .. شكرا لك ');
     this.reset();
     this.getAllCustomerTypes();
   }, err => {
     let errorMessage = err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
     this.swalService.NotifierError(errorMessage)
    },)
   }
 
   open(){
    this.reset();
  }
   delete(  index: number ) {
     this.editObj = {...this.customerstypesItem[index]}
     this.index = index;
     this.swalService.showRemoveConfirmation(index).then(
       result => {
         if (result.value) {
           this.CustomerTypesServices.delete(this.editObj.id).subscribe(
             res => {
               this.swalService.Notifier('تم مسح البيانات بنجاح ');
               this.reset();
               this.getAllCustomerTypes();
 
             },
             err => {
               let errorMessage = err.message || ' خطآ في مسح البياتات  ';
               this.swalService.NotifierError(errorMessage)
             }
           )
         }
       }
     );
   }
 
   saveupdate(){
    this.update();
  }

  update( ) {
  
    
    this.CustomerTypesServices.update(this.customerstypes.id, this.customerstypes).subscribe(
      res => {
        this.swalService.Notifier('تم حفظ التعديلات بنجاح ');
         this.reset();
        this.getAllCustomerTypes();
      },
      err => {
        let errorMessage = err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
        this.swalService.NotifierError(errorMessage)

      }
    )
  }
  cancel(){
    this.reset();
  }

  getPermission(){
    let permission = localStorage.getItem('role');
    if(permission == 'Admin'){
      this.AddEdit = true;
    } else {
      this.AddEdit = false;
    }
  }
}
