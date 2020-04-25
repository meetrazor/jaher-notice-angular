import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-left-inner',
  templateUrl: './sidebar-left-inner.component.html'
})
export class SidebarLeftInnerComponent implements OnInit  {
  school = false;
  name = '';
  schoolId = '';
  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.school = true;
    this.name = 'meet';
    this.schoolId = '12';
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.name = currentUser.admin_user_name;
    // this.schoolId = currentUser.school_id;
    // if (currentUser.school_id > 0) {
    //   this.school = false;
    // } else {
    //   this.school = true;
    // }
  }

}
