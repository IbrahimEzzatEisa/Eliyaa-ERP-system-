import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
UserComponent,
UserListComponent  
],
  imports: [
    CommonModule,
    UserRoutingModule,
   FormsModule,
    SharedModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class UserModule { }
