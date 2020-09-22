import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent } from './city.component';
import { CityListComponent } from './city-list/city-list.component';



const routes: Routes = [{
  path: '',
  component: CityComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: CityListComponent,

        }
       
       
     
      ]     
    
 
  
}];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
