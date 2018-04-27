import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  phoneMenu() {
    let arr = document.getElementsByTagName('li');
    console.log(arr[0]);
    for (let i = 0; i < arr.length; i++) {
      arr[i].className += ' menu-class';
    }
  }

  logOut() {
    localStorage.clear();
  }

}
