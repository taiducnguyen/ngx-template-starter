import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './404/not-found.component';
import { AccessDeniedComponent } from './403/access-denied.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: '**', component: NoContentComponent },
  { path: 'access-denied', component: AccessDeniedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
