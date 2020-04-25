import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from 'angular-admin-lte';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { adminLteConf } from './admin-lte.conf';
import { CoreModule } from 'src/core/core.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateComponent } from './template/template.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent, TemplateComponent, NotificationComponent
  ],
  imports: [
    BrowserModule, CoreModule, FormsModule, AutocompleteLibModule,
    AppRoutingModule, LayoutModule.forRoot(adminLteConf), ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
