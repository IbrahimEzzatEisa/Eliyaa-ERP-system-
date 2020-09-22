import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubstatusComponent } from './substatus.component';
import { SubstatusListComponent } from './substatus-list/substatus-list.component';



const routes: Routes = [{
  path: '',
  component: SubstatusComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: SubstatusListComponent,

        }
       
       
     
      ]     
    
 
  
}];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubstatusRoutingModule { }
