import { NotificationComponent } from './notification/notification.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplateComponent } from './template/template.component';


const routes: Routes = [
  // {
  // path: 'login',
  // data: {
  //   customLayout: true,
  // },
  // children: [
  //    {
  //      path: '',
  //      component: LoginComponent
  //   }
  //   ]
  // },
  {
    path: '',
    redirectTo: 'upload-notice',
    pathMatch: 'full'
  },
  {
    path: 'upload-notice',
    data: {
      customLayout: true,
    },
    component: DashboardComponent

  }, {
    path: 'alert/:id',
    data: {
      customLayout: true,
    },
    component: TemplateComponent
  }, {
    path: 'notification',
    data: {
      customLayout: true,
    },
    component: NotificationComponent

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
