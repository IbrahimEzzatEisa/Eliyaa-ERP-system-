import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subtypes',
  template: `<router-outlet></router-outlet>`
})
export class SubtypesComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
