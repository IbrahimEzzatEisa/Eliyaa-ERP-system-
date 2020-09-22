import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SubtypesComponent } from './subtypes.component';
import { SubtypesListComponent } from './subtypes-list/subtypes-list.component';
import { SubtypesRoutingModule } from './subtypes-routing.module';



@NgModule({
  declarations: [
SubtypesComponent,
SubtypesListComponent
  
],
  imports: [
    CommonModule,
    SubtypesRoutingModule,
   FormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class SubtypesModule { }
