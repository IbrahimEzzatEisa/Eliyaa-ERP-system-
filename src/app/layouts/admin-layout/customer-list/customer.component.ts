import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  template: `<router-outlet></router-outlet>`
})
export class CustomerComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
