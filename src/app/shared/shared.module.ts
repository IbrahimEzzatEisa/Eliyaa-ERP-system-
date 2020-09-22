import { CommonModule, DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';
import { PageTitleComponent } from './components/page-title/page-title.component';
import {   GregorianHijriCalendarComponent} from './components/gregorian-hijri-calendar/gregorian-hijri-calendar.component';
import { FilterPipe, paginate, SelectPipe, AppDatePipe } from './pipes';
import { FixedNumberPipe } from './pipes/fixed-number.pipe';
import { ConvertArDigitToEnPipe } from './pipes/convert-ar-digit-to-en.pipe';
import { TableInfoComponent } from './components/table-info/table-info.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';



const PIPES = [
  FilterPipe,
  paginate,
  SelectPipe,
  AppDatePipe,
  FixedNumberPipe,
  ConvertArDigitToEnPipe,
]

@NgModule({
  declarations: [ PageTitleComponent  ,GregorianHijriCalendarComponent , TableInfoComponent,   
     ...PIPES],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,


    
  ],
  exports: [
    PageTitleComponent ,
  GregorianHijriCalendarComponent,
  TableInfoComponent,
  ...PIPES
  ],
  providers: [FilterPipe  , DatePipe]

})
export class SharedModule {
}
