import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SchoolComponent } from './school/school.component';
import { ParentListComponent } from './parent-list/parent-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent },
  { path: 'school', component: SchoolComponent },
  { path: 'parent', component: ParentListComponent },
  { path: 'parent/:externalId', component: ParentListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



