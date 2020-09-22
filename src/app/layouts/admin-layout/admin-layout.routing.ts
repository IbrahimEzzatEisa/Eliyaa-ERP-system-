import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';

const AdminLayoutRoutes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
  
      {
        path: 'dashboard',
        loadChildren: () => import('../admin-layout/dashboard/dashboard.module').then(m => m.DashboardModule),
      },

      {
        path: 'customer',
        loadChildren: () => import('../admin-layout/customers/customers.module').then(m => m.CustomersModule),
      },
      {
        path: 'city',
        loadChildren: () => import('../admin-layout/city-list/city.module').then(m => m.CityModule),
      },
      {
        path: 'customers',
        loadChildren: () => import('../admin-layout/customer-list/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'subtypes',
        loadChildren: () => import('../admin-layout/subtypes-list/subtypes.module').then(m => m.SubtypesModule),
      },

      {
        path: 'subscribition',
        loadChildren: () => import('../admin-layout/substatus-list/substatus.module').then(m => m.SubstatusModule),
      },
   
      {
        path: 'user',
        loadChildren: () => import('../admin-layout/user/user.module').then(m => m.UserModule),
      },

    
    
    
  
    ]
   
  }];
  
  @NgModule({ 
    imports: [RouterModule.forChild(AdminLayoutRoutes)],
    exports: [RouterModule]
  })
  export class AdminLayoutRoutesModule { }
