import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatTableModule, MatCardModule, MatSnackBarModule, MatRadioModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolComponent } from './school/school.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParentListComponent } from './parent-list/parent-list.component';
import { HttpModule } from '@angular/http';
import { MatIconModule } from "@angular/material/icon";
import { HeaderInterceptor } from './header.interceptor';
import { QuestionsComponent } from './questions/questions.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/config.service';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { RadioComponent } from './radio/radio.component';

// import { Injectable } from '@angular/core';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SchoolComponent,
    ParentListComponent,
    QuestionsComponent,
    ConfirmModalComponent,
    RadioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterTestingModule,
    // HttpClient,
    // Injectacble,
    CommonModule,
    RouterModule.forRoot([])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
