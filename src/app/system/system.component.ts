import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
  isPhone: boolean;
  @ViewChild('navList') navList: ElementRef;
  @ViewChild('appPage') appPage;

  constructor() {
  }

  ngOnInit() {
    this.checkDevice();
  }

  checkDevice() {
    if (this.appPage.nativeElement.clientWidth < 768) {
      this.isPhone = true;
    } else {
      this.isPhone = false;
    }
  }

  phoneMenu() {
    const arr = this.navList.nativeElement.className.split(' ');
    if (arr[arr.length - 1] === 'menu-class') {
      this.navList.nativeElement.className = '';
      for (let i = 0; i < arr.length - 1; i++) {
        if (i < arr.length - 2) {
          arr[i] += ' ';
        }
        this.navList.nativeElement.className += arr[i];
      }
    } else {
      this.navList.nativeElement.className += ' menu-class';
    }
  }

  clickMenuElement() {
    this.checkDevice();
    if (this.isPhone) {
      const arr = this.navList.nativeElement.className.split(' ');
      this.navList.nativeElement.className = '';
      for (let i = 0; i < arr.length - 1; i++) {
        if (i < arr.length - 2) {
          arr[i] += ' ';
        }
        this.navList.nativeElement.className += arr[i];
      }
    }
  }

  logOut() {
    localStorage.clear();
  }

}
