import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bla',
  templateUrl: './bla.component.html',
  styleUrls: ['./bla.component.css']
})
export class BlaComponent implements OnInit {

  //constructor() { }
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  // register()
  // {
  //   this.route.navigate(['/registerUser']);  
  // }

}
