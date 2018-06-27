import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { UnauthComponent } from './master/unauth/unauth.component';
import { AuthComponent } from './master/auth/auth.component';
import { TimeoutComponent } from './timeout/timeout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard.service';

const routes: Routes = [
  {path: '', component: UnauthComponent},
  {path: 'weather', canActivate: [AuthGuard], component: AuthComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'timeout', component: TimeoutComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
