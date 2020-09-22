import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';



@NgModule({
  declarations: [
CustomerComponent,
CustomerListComponent
  
],
  imports: [
    CommonModule,
    CustomerRoutingModule,
   FormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class CustomerModule { }
