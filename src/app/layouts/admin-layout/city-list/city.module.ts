import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CityComponent } from './city.component';
import { CityRoutingModule } from './city-routing.module';
import { CityListComponent } from './city-list/city-list.component';



@NgModule({
  declarations: [
CityComponent,
CityListComponent
  
],
  imports: [
    CommonModule,
    CityRoutingModule,
   FormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class CityModule { }
