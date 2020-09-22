import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}


export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'الصفحة الرئيسية ',  icon:' dashboard', class: '' },
        { path: 'customer', title: 'العملاء ',  icon:' supervisor_account', class: '' },

    { path: 'city', title: 'المدن ',  icon:' room', class: '' },
    { path: 'customers', title: 'أنواع العملاء ',  icon:' assignment_ind', class: '' },
    { path: 'subscribition', title: 'حالات الأشتراك ',  icon:' design_services', class: '' },
    { path: 'subtypes', title: 'أنواع الأشتراك ',  icon:' analytics', class: '' },




];
  
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  AddEdit:boolean =true;


  constructor(private router: Router) { }

  ngOnInit() {
this.getPermission();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  getPermission(){
    let permission = localStorage.getItem('role');
    if(permission == 'Admin'){
      this.AddEdit = true
    } else {
      this.AddEdit = false;
    }
  }
}
