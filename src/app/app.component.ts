import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public customLayout: boolean;

  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.customLayout = value;
      if (!this.customLayout) {
        try {
          const currentUser = JSON.parse(localStorage.getItem('currentUser'));
          if (!currentUser) {
            // this.router.navigate(['/login']);
          }
        } catch (e) {
          // this.router.navigate(['/login']);
        }
      }
    });
  }
  onclick(){
    return false;
  }

}
