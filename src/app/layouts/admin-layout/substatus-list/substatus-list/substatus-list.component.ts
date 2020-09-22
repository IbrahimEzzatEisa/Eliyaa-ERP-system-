import { Component, OnInit } from '@angular/core';
import { CustomerTypes, FilterParams, SubscriptionStatus } from 'app/shared/models';
import { SwalService } from 'app/shared/services';
import { CustomerTypesService } from 'app/shared/services/api/customer-types.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Config } from 'protractor';
import { SubscriptopnStatusService } from 'app/shared/services/api/subscriptopn-status.service';

@Component({
  selector: 'app-substatus-list',
  templateUrl: './substatus-list.component.html',
  styleUrls: ['./substatus-list.component.css']
})
export class SubstatusListComponent implements OnInit {

// search and pagination 
  term='';
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
      label: '  حالة الأشتراك ',
      visible: true
    },
   

    {
      key: 'choises',
      label: 'أختيارات',
      visible: true
    }
  ];
  // main object
  subscriptionStatus: SubscriptionStatus;
  
  // array of tabel 
  subscriptionStatusItem: SubscriptionStatus[]=[];


  editObj :SubscriptionStatus = new SubscriptionStatus();
  index : number

  AddEdit: boolean = true;

      // dropdown filter  -- page permission
      filterParams = new FilterParams();

      // paginatopn array
      collection = [];

    constructor(    private swalService: SwalService,
      private SubscriptionStatusServices: SubscriptopnStatusService,
      private spinner: NgxSpinnerService
  
      ) { }
  ngOnInit() {
    // init obj
    this.subscriptionStatus = new SubscriptionStatus();
    this.getAllSubscriptionStatus();
    this.getPermission();

  }

    // get all data in tabel 
    getAllSubscriptionStatus(){
      this.spinner.show();
        this.SubscriptionStatusServices.getAll().subscribe(res=>{
          this.subscriptionStatusItem = res;
          for(let i=1;i<=100;i++){
            let Obj = this.subscriptionStatusItem;
            this.collection.push(Obj);
            }
          this.spinner.hide();
        })
      }
       //fill
  fill(prop: SubscriptionStatus) {
    this.subscriptionStatus.id = prop.id;
    this.subscriptionStatus.localText = prop.localText;
}
reset(){
  this.subscriptionStatus.id = 0;
  this.subscriptionStatus.localText = '';
}
open(){
  this.reset();
}
save(){
  this.SubscriptionStatusServices.create(this.subscriptionStatus).subscribe(res =>{
   this.swalService.Notifier(' تم الحفظ بنجاح .. شكرا لك ');
   this.reset();
   this.getAllSubscriptionStatus();
 }, err => {
   let errorMessage = err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
   this.swalService.NotifierError(errorMessage)
  },)
 }


 delete(  index: number ) {
   this.editObj = {...this.subscriptionStatusItem[index]}
   this.index = index;
   this.swalService.showRemoveConfirmation(index).then(
     result => {
       if (result.value) {
         this.SubscriptionStatusServices.delete(this.editObj.id).subscribe(
           res => {
             this.swalService.Notifier('تم مسح البيانات بنجاح ');
             this.reset();
             this.getAllSubscriptionStatus();

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

  
  this.SubscriptionStatusServices.update(this.subscriptionStatus.id, this.subscriptionStatus).subscribe(
    res => {
      this.swalService.Notifier('تم حفظ التعديلات بنجاح ');
       this.reset();
      this.getAllSubscriptionStatus();
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
    this.AddEdit = true
  } else {
    this.AddEdit = false;
  }
}

}
