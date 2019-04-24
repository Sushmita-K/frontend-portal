import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatTableModule, MatCardModule, } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolComponent } from './school/school.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParentListComponent } from './parent-list/parent-list.component';
import { HttpModule } from '@angular/http';
import { MatIconModule } from "@angular/material/icon";
import { HeaderInterceptor } from './header.interceptor'


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SchoolComponent,
    ParentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MatIconModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
