import { ACTION_CAMBIAR_USUARIO } from './../../store/usuario-store/usuario-action';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ReduxService } from 'src/app/services/redux.service';
import { IAction } from '@dipujaen/dpj-models-shared';
import { ACTION_CAMBIAR_TOKEN } from 'src/app/store/usuario-store/usuario-action';
import '../../../assets/js/miniapplet/authenticator.js';
import { environment } from '../../../environments/environment';
import { DpjServicesArqService } from '@dipujaen/dpj-services-arq';
import { MessageService } from 'primeng/api';
declare var authenticate: any;

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.scss']
})
export class AccesoComponent implements OnInit {

  private _idaplica: string = environment.idaplica;
  public get idaplica(): string {
    return this._idaplica;
  }
  public set idaplica(value: string) {
    this._idaplica = value;
  }

  constructor(private router: Router, private usuarioRedux: ReduxService, private dpjServicesArqService: DpjServicesArqService,
    private activatedRoute: ActivatedRoute, private messageService: MessageService) {
  }

  updateCertificado(){

    let certificado = (<HTMLInputElement>document.getElementById("certificado")).value;
    (<HTMLInputElement>document.getElementById("certificado")).value="";
    this.getTokenCertificado(certificado);
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {

      let cid = params['cid'] ;

      if (cid!==undefined && cid !== null && cid !== ''){

        this.getTokenClave(cid);
      }
  });
  }

  getTokenCertificado(certificado){

    this.dpjServicesArqService
    .getTokenCertificado(certificado, this.idaplica
    )
    .subscribe(
      (res: any) => {
        this.validateToken(res.token);
      },
      (err) => {
        this.messageService.add({severity:'error', summary: 'Fallo en la autenticación', detail:'El usuario no está registrado en el Sistema'});
      }
    );
  }

  getTokenClave(cid){
    this.dpjServicesArqService
    .getTokenClave(cid,this.idaplica)

    .subscribe(
      (res: any) => {
        this.validateToken(res.token);
      },
      (err) => {
        this.messageService.add({severity:'error', summary: 'Fallo en la autenticación', detail:'El usuario no está registrado en el Sistema'});
      }
    );
  }

  validateToken(token) {

    if (token !== null && token !== "") {

      const storeToken: IAction = {
        type: ACTION_CAMBIAR_TOKEN,
        payload: token
      };

      this.usuarioRedux.updateState(storeToken);
      this.usuarioRedux.updateState({type: ACTION_CAMBIAR_USUARIO, payload: 'NOVA0011'});
      this.router.navigate(['home']);
    }
  }

  accesoCertificado(){
    authenticate();
  }

  accesoClave(){
    window.location.href = environment.claveUrl;
  }
}


