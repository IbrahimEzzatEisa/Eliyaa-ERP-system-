import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SubstatusComponent } from './substatus.component';
import { SubstatusListComponent } from './substatus-list/substatus-list.component';
import { SubstatusRoutingModule } from './substatus-routing.module';



@NgModule({
  declarations: [
SubstatusComponent,
SubstatusListComponent
  
],
  imports: [
    CommonModule,
    SubstatusRoutingModule,
   FormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class SubstatusModule { }
