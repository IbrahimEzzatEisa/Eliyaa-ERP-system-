import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city',
  template: `<router-outlet></router-outlet>`
})
export class CityComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
