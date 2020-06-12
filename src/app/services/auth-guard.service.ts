import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { ReduxService } from "./redux.service";
import { UsuarioState } from "../store/usuario-store/usuario-state";

@Injectable()
export class AuthGuardService implements CanActivate {
  private existeToken: boolean = false;

  constructor(public router: Router, private reduxService: ReduxService) {}
  canActivate(): boolean {
    this.validateToken();
    if (this.existeToken) {
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }

  validateToken() {
    this.reduxService.getUsuarioState().subscribe((res: UsuarioState) => {
      if (res.token === undefined || res.token === null || res.token === "") {
        this.existeToken = false;
      } else {
        this.existeToken = true;
      }
    });
  }
}
