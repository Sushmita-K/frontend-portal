import { NgModule, Inject } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SchoolComponent } from './school/school.component';
import { ParentListComponent } from './parent-list/parent-list.component';
import { QuestionsComponent } from './questions/questions.component';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent },
  { path: 'school', component: SchoolComponent },
  { path: 'parent', component: ParentListComponent },
  { path: 'parent/:externalId', component: ParentListComponent },
  { path: 'question', component: QuestionsComponent },
  // { path: 'submission/:externalId', component: QuestionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpModule, BrowserModule,],
  exports: [RouterModule]
})
export class AppRoutingModule { }



