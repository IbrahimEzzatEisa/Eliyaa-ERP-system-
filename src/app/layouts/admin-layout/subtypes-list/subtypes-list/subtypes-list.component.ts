import { Component, OnInit } from '@angular/core';
import { Config } from 'protractor';
import { SubscriptionTypes, FilterParams } from 'app/shared/models';
import { SwalService } from 'app/shared/services';
import { SubscriptopnTypesService } from 'app/shared/services/api/subscriptopn-types.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-subtypes-list',
  templateUrl: './subtypes-list.component.html',
  styleUrls: ['./subtypes-list.component.css']
})
export class SubtypesListComponent implements OnInit {


  //pagination and search 

  term = '';
  p:any;


    // tabel config 
    configs: Config[] = [
  
      {
        key: 'id',
        label: ' المسلسل',
        visible: true
      },
      {
        key: 'localText',
        label: ' نوع الأشتراك ',
        visible: true
      },
     
  
      {
        key: 'choises',
        label: 'أختيارات',
        visible: true
      }
    ];


  // main object
  subscriptionTypes: SubscriptionTypes;
  
  // array of tabel 
  subscriptionTypesItem: SubscriptionTypes[]=[];


  editObj :SubscriptionTypes = new SubscriptionTypes();
  index : number;

     // dropdown filter  -- page permission
     filterParams = new FilterParams();

     //pagination array
     collection = [];

     // permission 
     AddEdit: boolean = true;

  constructor(   private swalService: SwalService,
    private subscriptopnTypesService: SubscriptopnTypesService ,
    private spinner: NgxSpinnerService
    ) { }
  ngOnInit() {
    //init object
    this.subscriptionTypes = new SubscriptionTypes();
    this.getAllCustomerTypes();
    this.getPermission();
  }
  // get all data in tabel 
  getAllCustomerTypes(){
    this.spinner.show()
    this.subscriptopnTypesService.getAll().subscribe(res=>{
      this.subscriptionTypesItem = res;
      for(let i=1;i<=100;i++){
        let Obj = this.subscriptionTypesItem;
        this.collection.push(Obj);
        }
      this.spinner.hide()

    })
  }

   //fill
   fill(prop: SubscriptionTypes) {
    this.subscriptionTypes.id = prop.id;
    this.subscriptionTypes.localText = prop.localText;
}
reset(){
  this.subscriptionTypes.id = 0;
  this.subscriptionTypes.localText = '';
}
save(){
  this.subscriptopnTypesService.create(this.subscriptionTypes).subscribe(res =>{
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
   this.editObj = {...this.subscriptionTypesItem[index]}
   this.index = index;
   this.swalService.showRemoveConfirmation(index).then(
     result => {
       if (result.value) {
         this.subscriptopnTypesService.delete(this.editObj.id).subscribe(
           res => {
             this.swalService.Notifier('تم مسح البيانات بنجاح  ');
             this.reset();
             this.getAllCustomerTypes();

           },
           err => {
             let errorMessage = err.message || ' خطآ في مسح البيانات  ';
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

  
  this.subscriptopnTypesService.update(this.subscriptionTypes.id, this.subscriptionTypes).subscribe(
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


