import { Component, OnInit } from '@angular/core';
import { Config } from 'protractor';
import { Cities, FilterParams } from 'app/shared/models';
import { SwalService } from 'app/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { CitiesService } from 'app/shared/services/api/cities.service';
@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

// pagination and search 
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
      label: ' أسم المدينة',
      visible: true
    },
   

    {
      key: 'choises',
      label: 'أختيارات',
      visible: true
    }
  ];

    // main object
    cities: Cities;
  
    // array of tabel 
    citiesItem: Cities[]=[];
  
  
    editObj :Cities = new Cities();

    // index of table
    index : number

        // dropdown filter  -- page permission
        filterParams = new FilterParams();
        // pagination array 
        collection = [];

      // add edit permissions
        AddEdit: boolean = true;
    
        constructor(    private swalService: SwalService,
          private citiesServices: CitiesService,
          private spinner: NgxSpinnerService
      
          ) { }
  ngOnInit() {
    // init object
    this.cities = new Cities();
    this.getAllCities();
    this.getPermission();
  }
  open(){
    this.reset();
  }
    // get all data in tabel 
    getAllCities(){
      this.spinner.show();
      this.citiesServices.getAll().subscribe(res=>{
        this.citiesItem = res;
        this.spinner.hide();
  
        for(let i=1;i<=100;i++){
          let Obj = this.citiesItem;
          this.collection.push(Obj);
          }
        
  })}

     //fill
     fill(prop: Cities) {
      this.cities.id = prop.id;
      this.cities.localText = prop.localText;
  }

  reset(){
    this.cities.id = 0;
    this.cities.localText = '';
  }
  save(){
    this.citiesServices.create(this.cities).subscribe(res =>{
     this.swalService.Notifier(' تم الحفظ بنجاح .. شكرا لك ');
     this.reset();
     this.getAllCities();
   }, err => {
     let errorMessage = err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
     this.swalService.NotifierError(errorMessage)
    },)
   }

   saveupdate(){
    this.update();
  }

  update( ) {
    this.citiesServices.update(this.cities.id, this.cities).subscribe(
      res => {
        this.swalService.Notifier('تم حفظ التعديلات بنجاح ');
         this.reset();
        this.getAllCities();
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
