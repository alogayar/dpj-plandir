import { Component, OnInit, ViewChild } from '@angular/core';
import { Ventana, FormularioParams, PanelFormulario, FilaParams, InputParams } from '@dipujaen/dpj-models-shared';
import { Wsgls02Service, Gli02a1, Glo02a1 } from '@dipujaen/dpj-services-fcp-gl';
import { FormularioComponent } from '@dipujaen/dpj-components-shared';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-glcg102',
  templateUrl: './glcg102.component.html'
})
export class Glcg102Component implements OnInit {

  // Atributos del componente
  @ViewChild( 'glcg102Form', null ) glcg102Form: FormularioComponent;
  ventanaAyuda: Ventana;
  formularioParams: FormularioParams;
  itemsMenu: MenuItem[];
  mostrarAyuda = false;
  tipoAcceso = 'Consultar';

  datos: {
    CPAIS: number;
    XPAIS: string;
    CDIR3: number;
    DNACIONA: string;
  };


  constructor( private wsgls02Service: Wsgls02Service, private router: Router, private messageService: MessageService ) {
    if ( this.router.getCurrentNavigation().extras.state !== null ) {
      this.datos = {
        CPAIS: this.router.getCurrentNavigation().extras.state.CPAIS,
        XPAIS: this.router.getCurrentNavigation().extras.state.XPAIS,
        CDIR3: this.router.getCurrentNavigation().extras.state.CDIR3,
        DNACIONA: this.router.getCurrentNavigation().extras.state.DNACIONA
      };
      this.tipoAcceso = this.router.getCurrentNavigation().extras.state.ACCESO;
    }
  }

  ngOnInit() {
    this.ventanaAyuda = new Ventana();
    this.ventanaAyuda.nombreCliente = 'GLCG1';
    this.ventanaAyuda.nombreVentana = 'GLCG102';
    this.ventanaAyuda.tituloVentana = 'Detalle Países';
    this.ventanaAyuda.fechaCreacion = '07/05/2020 17:58:45';

    this.formularioParams = new FormularioParams( [], false, false);
    this.formularioParams.paneles = [ new PanelFormulario( [], this.tipoAcceso ) ];
    this.formularioParams.paneles[0].filasFormulario = [];
    let inputs = [];
    inputs.push( new InputParams( 'País', 'label', '_500', null, null, null, null, 'ui-g-1' ) );
    inputs.push( new InputParams( '', 'number', 'CPAIS_100', this.datos.CPAIS.toString(), null, null, null, 'ui-g-1' ) );
    inputs.push( new InputParams( 'Descripción', 'label', '_501', null, null, null, null, 'ui-g-1' ) );
    inputs.push( new InputParams( '', 'text', 'XPAIS_101', this.datos.XPAIS, null, null, null, 'ui-g-5' ) );
    this.formularioParams.paneles[0].filasFormulario.push( new FilaParams( 0, inputs, 4, true ) );
    inputs = [];
    inputs.push( new InputParams( 'DIR3', 'label', '_502', null, null, null, null, 'ui-g-1' ) );
    inputs.push( new InputParams( '', 'number', 'CDIR3_102', this.datos.CDIR3.toString(), null, null, null, 'ui-g-1' ) );
    inputs.push( new InputParams( 'Nacionalidad', 'label', '_503', null, null, null, null, 'ui-g-1' ) );
    inputs.push( new InputParams( '', 'text', 'DNACIONA_103', this.datos.DNACIONA, null, null, null, 'ui-g-5' ) );
    this.formularioParams.mostrarBotonAceptar = true;
    this.formularioParams.paneles[0].filasFormulario.push( new FilaParams( 1, inputs, 4, true ) );
    inputs = [];

    this.itemsMenu = [
      {
          label: 'Opciones',
          items: [
                      { label: 'Imprimir', disabled: false, command: () => this.imprimir() },
                      { label: 'Limpiar', disabled: false, command: () => this.limpiar() },
                      { label: 'Ir a Inicio', disabled: false, command: () => this.router.navigateByUrl('/glcg1/glcg100') },
                      { label: 'Salir', disabled: false, command: () => this.router.navigateByUrl('/') }
          ]
      },
      {
          label: 'Ayuda',
          items: [
                      { label: 'Ayuda sobre Ayuda', disabled: false, command: () => this.ayudasobreayuda() },
                      { label: 'Manual de Usuario', disabled: false, command: () => this.manualdeusuario() },
                      { label: 'Indice de Ayudas', disabled: false, command: () => this.indicedeayudas() },
                      { label: 'Acerca de...', disabled: false, command: () => this.verAyuda() }
          ]
      }
    ];

  }

  // Definición de funciones propias del componente

  imprimir() {
    setTimeout( () => window.print(), 1000);
  }

  limpiar() {
    this.glcg102Form.limpiarFormulario();
  }

  ayudasobreayuda() { }

  manualdeusuario() { }

  indicedeayudas() { }

  verAyuda() {
    this.mostrarAyuda = !this.mostrarAyuda;
  }

  estadoAyuda( estado ) {
    this.mostrarAyuda = estado;
  }

}
