import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { 
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard] 
  },
  { path: '', component: AccesoComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
