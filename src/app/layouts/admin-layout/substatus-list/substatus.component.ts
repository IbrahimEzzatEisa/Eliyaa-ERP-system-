import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-substatus',
  template: `<router-outlet></router-outlet>`
})
export class SubstatusComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
