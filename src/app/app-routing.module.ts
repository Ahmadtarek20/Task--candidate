import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './Auth/auth.module';
import { AuthGuard } from './Guards/auth.guard';
import { ProfileModule } from './main/componants/profile/profile.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: 'auth', loadChildren: () => AuthModule, outlet: 'primary' },
  { path: 'profile', loadChildren: () => ProfileModule, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
