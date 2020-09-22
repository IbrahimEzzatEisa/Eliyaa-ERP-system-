import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersRoutingModule } from './customers-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
CustomersComponent,
CustomersListComponent

  
],
  imports: [
    CommonModule,
    CustomersRoutingModule,
   FormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule


  ]
})
export class CustomersModule { }
