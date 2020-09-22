import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';
import { Users, FilterParams, AllUser } from 'app/shared/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  AddEdit:boolean = true;
term:'';
p:any;

role: string;
isPost: boolean = false;
pass:''
//main-object
user: Users;
userList: AllUser[]=[];

editObj :AllUser = new AllUser();
index : number

  // dropdown filter  -- page permission
  filterParams = new FilterParams();
  collection = [];

  constructor( private swalService: SwalService,
    private userServices: UsersService ,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.user = new Users();
    this.getAllUsers();
    
  }

    // get all data in tabel 
    getAllUsers(){
      this.spinner.show()
      this.userServices.getAll().subscribe(res=>{
        this.userList = res;
        for(let i=1;i<=100;i++){
          let Obj = this.userList;
          this.collection.push(Obj);
          }
        this.spinner.hide()
  
      })
    }
  

     //fill
     fill(prop: AllUser) {
      this.user.id = prop.id;
      this.user.username = prop.email;
      this.user.role = prop.role;
        this.role = prop.role
        this.user.confirmpass = '';
      

  }
  reset(){
    this.user.id = '';
    this.user.username = '';
    this.user.password = '';
    this.user.role = '';
    this.role = ''
    this.user.confirmpass = '';

  }
  open(){
    this.reset();
  }
   save(){

    if(this.user.confirmpass !== this.user.password) {
      let errorMessage =  '  ..كلمة المرور  غير متطابقة     ';
      this.swalService.NotifierError(errorMessage)
      return;
    }
    if((this.user.confirmpass.length && this.user.password.length) >=0 ) {
      let errorMessage =  '  ..   يجب أدخال علي الأقل ٦ حروف  ،، أرقام ،، رموز      ';
      this.swalService.NotifierError(errorMessage)
      return;
    }
    this.userServices.create(this.user).subscribe(res =>{
     this.swalService.Notifier(' تم الحفظ بنجاح .. شكرا لك ');
     this.reset();
     this.getAllUsers();

   }, err => {
     let errorMessage =  err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
     this.swalService.NotifierError(errorMessage)
    })
   }
 
   delete(  index: number ) {
     this.editObj = {...this.userList[index]}
     this.index = index;
     this.swalService.showRemoveConfirmation(index).then(
       result => {
         if (result.value) {
           this.userServices.delete(this.editObj.id).subscribe(
             res => {
               this.swalService.Notifier('تم مسح البيانات بنجاح ');
               this.reset();
               this.getAllUsers();
 
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
    this.userServices.update(this.user).subscribe(
      res => {
        this.swalService.Notifier('تم حفظ التعديلات بنجاح ');
         this.reset();
        this.getAllUsers();
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
selectAdmin(){
  this.user.role = 'Admin';
   this.role = this.user.role;


}
selectViewer(){
  this.user.role = 'Viewer';
   this.role = this.user.role;
}


}
