import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AccesoComponent } from './components/acceso/acceso.component';


const routes: Routes = [
  { path: '', component: AccesoComponent },
  { 
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService] 
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
