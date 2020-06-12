import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ReduxService } from 'src/app/services/redux.service';
import { IAction } from '@dipujaen/dpj-models-shared';
import { ACTION_CAMBIAR_TOKEN } from 'src/app/store/usuario-store/usuario-action';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.scss']
})
export class AccesoComponent implements OnInit {

  constructor(public router: Router, private usuarioRedux: ReduxService) {}

  ngOnInit() {
  }

  validateToken(token) {

    if (token !== null && token !== "") {
    
      // Almacenamos el token en redux
      const storeToken: IAction = {
        type: ACTION_CAMBIAR_TOKEN,
        payload: token
      };

      this.usuarioRedux.updateState(storeToken);

      this.router.navigate(['home']);
    }
  }

}
