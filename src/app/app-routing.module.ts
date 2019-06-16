import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './404/not-found.component';
import { AccessDeniedComponent } from './403/access-denied.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'about', loadChildren: './modules/about/about.module#AboutModule' },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', component: NoContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
