import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubtypesListComponent } from './subtypes-list/subtypes-list.component';
import { SubtypesComponent } from './subtypes.component';



const routes: Routes = [{
  path: '',
  component: SubtypesComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: SubtypesListComponent,

        }
       
       
     
      ]     
    
 
  
}];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubtypesRoutingModule { }
