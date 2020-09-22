import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
DashboardComponent
  
],
  imports: [
    CommonModule,
    DashboardRoutingModule,
   FormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class DashboardModule { }
