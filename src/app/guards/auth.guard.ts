import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReduxService } from '../services/redux.service';
import { UsuarioState } from '../store/usuario-store/usuario-state';

@Injectable()
export class AuthGuard implements CanActivate {

  private _existeToken: boolean = false;

  public get existeToken(): boolean {
    return this._existeToken;
  }
  public set existeToken(value: boolean) {
    this._existeToken = value;
  }

  constructor(public router: Router, private reduxService: ReduxService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.validateToken();
      if (this.existeToken) {
        return true;
      } else {
        this.router.navigate(["login"]);
        return false;
      }
  }

  private validateToken() {
    this.reduxService.getUsuarioState().subscribe((res: UsuarioState) => {
      if (res.tokenUsuario === undefined || res.tokenUsuario === null || res.tokenUsuario === "") {
        this.existeToken = false;
      } else {
        this.existeToken = true;
      }
    });
  }

}
