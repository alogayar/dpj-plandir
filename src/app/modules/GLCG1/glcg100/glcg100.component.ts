import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Ventana, BusquedaParams, InputParams, FilaParams, FieldsetPaneles, ListboxParams, MessageError } from '@dipujaen/dpj-models-shared';
import { Wsgls02Service, Gli02q5, Glo02q5 } from '@dipujaen/dpj-services-fcp-gl';
import { BusquedaComponent } from '@dipujaen/dpj-components-shared';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-glcg100',
  templateUrl: './glcg100.component.html'
})
export class Glcg100Component implements OnInit {

  // Atributos del componente
  @ViewChild( 'glcg100Busqueda', null ) glcg100Busqueda: BusquedaComponent;
  ventanaAyuda: Ventana;
  lbgcg100Id102Params = new ListboxParams();
  busquedaParams: BusquedaParams;
  itemsMenu: MenuItem[];
  mostrarAyuda = false;
  controlsForm = {
    CPAIS: '',
    XPAIS: ''
  };

  // Atributos relacionados con los WS
  gli02q5: Gli02q5;
  glo02q5: Glo02q5;

  constructor( private wsgls02Service: Wsgls02Service, private router: Router, private messageService: MessageService ) { }

  ngOnInit() {
    this.ventanaAyuda = new Ventana();
    this.ventanaAyuda.nombreCliente = 'GLCG1';
    this.ventanaAyuda.nombreVentana = 'GLCG100';
    this.ventanaAyuda.tituloVentana = 'Mantenimiento de Países';
    this.ventanaAyuda.fechaCreacion = '07/05/2020 17:58:45';

    this.lbgcg100Id102Params.exportar = true;
    this.lbgcg100Id102Params.height = 350;
    this.lbgcg100Id102Params.exportarSelec = true;
    this.lbgcg100Id102Params.multiSelect = true;
    this.lbgcg100Id102Params.mostrarFiltro = true;
    this.lbgcg100Id102Params.mostrarFilas = true;
    this.lbgcg100Id102Params.mostrarLeyenda = true;
    this.lbgcg100Id102Params.leyenda = '* Se mostrarán un máximo de 500 registros';
    this.lbgcg100Id102Params.ordenable = true;
    this.lbgcg100Id102Params.loading = false;
    this.lbgcg100Id102Params.columnaOpciones = true;
    this.lbgcg100Id102Params.value = [];
    this.lbgcg100Id102Params.columns = [
                  { field: 'CPAIS', header: 'País' },
                  { field: 'XPAIS', header: 'Descripción País' },
                  { field: 'DNACIONA', header: 'Nacionalidad' },
                  { field: 'CDIR3', header: 'Dir3' } ];

    const formAux = this.retreiveLocalStorage( 'glcg100Busqueda' );
    if ( formAux !== null ) {
      this.controlsForm = formAux;
    }

    const lbAux = this.retreiveLocalStorage( 'lbgcg100Id102' );
    if ( lbAux !== null ) {
      this.lbgcg100Id102Params.value = lbAux;
    }

    this.busquedaParams = new BusquedaParams();
    this.busquedaParams.mostrarBotonLimpiar = true;
    this.busquedaParams.nombrePanel = 'Búsqueda';
    this.busquedaParams.fieldsetPanel = [ new FieldsetPaneles( null, ' ' ) ];
    this.busquedaParams.fieldsetPanel[0].camposVisibles = [];
    let inputs = [];
    this.busquedaParams.fieldsetPanel[0].textoCabecera = 'Criterios';
    inputs.push( new InputParams( 'País', 'label', '_500', null, null, null, null, 'ui-g-1' ) );
    inputs.push( new InputParams( '', 'number', 'CPAIS_100', this.controlsForm.CPAIS, null, null, null, 'ui-g-1' ) );
    inputs.push( new InputParams( '', 'text', 'XPAIS_101', this.controlsForm.XPAIS, null, null, null, 'ui-g-5' ) );
    this.busquedaParams.fieldsetPanel[0].camposVisibles.push( new FilaParams( 1, inputs, 3, true ) );
    inputs = [];
    inputs.push( new InputParams( '', 'label', '', null, null, null, null, 'ui-g-11' ) );
    inputs.push( new InputParams( 'Añadir', 'button', '_1001', null, null, null, null, 'ui-g-1' ) );
    this.busquedaParams.fieldsetPanel[0].camposVisibles.push( new FilaParams( 2, inputs, 2, true ) );
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
          label: 'Seleccionar',
          items: [
                      { label: 'Seleccionar', disabled: false, command: () => this.seleccionar() }
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

  detalleLbgcg100id102( fila ) {
    fila.ACCESO = 'Consultar';
    this.navegarA( '/glcg1/glcg102', fila );
  }

  editarLbgcg100id102( fila ) {
    fila.ACCESO = 'Editar';
    this.navegarA( '/glcg1/glcg102', fila );
  }

  borrarLbgcg100id102( fila ) {
    fila.ACCESO = 'Borrar';
    this.navegarA( '/glcg1/glcg102', fila );
  }

  navegarA( ruta: string, datos: any ) {
    // Guardamos los datos de la ventana en el localStorage
    const datosForms = {
      CPAIS: this.glcg100Busqueda.obtenerValor( 'CPAIS_100' ),
      XPAIS: this.glcg100Busqueda.obtenerValor( 'XPAIS_101' )
    };
    this.saveLocalStorage( 'glcg100Busqueda', datosForms );
    this.saveLocalStorage( 'lbgcg100Id102', this.lbgcg100Id102Params.value );
    // Vamos a la ruta indicada
    this.router.navigate( [ruta], { state: datos } );
  }

  saveLocalStorage( key: string, value: any ): void {
    if (typeof(Storage) !== 'undefined') {
      // Código cuando Storage es compatible
      localStorage.setItem( key, JSON.stringify( value ) );
    } else {
      // Código cuando Storage NO es compatible
      this.messageService.add( new MessageError( 'Este navegador no es compatible con la aplicación' ) );
    }
  }

  retreiveLocalStorage( key ): any {
    if (typeof(Storage) !== 'undefined') {
      // Código cuando Storage es compatible
      const res = JSON.parse( localStorage.getItem( key ) );
      localStorage.removeItem( key );
      return res;
    } else {
      // Código cuando Storage NO es compatible
      this.messageService.add( new MessageError( 'Este navegador no es compatible con la aplicación' ) );
      return null;
    }
  }

  imprimir() {
    setTimeout( () => window.print(), 1000);
  }

  limpiar() {
    this.lbgcg100Id102Params.limpiar = true;
    this.glcg100Busqueda.limpiarBusqueda();
  }

  seleccionar() { }

  ayudasobreayuda() { }

  manualdeusuario() { }

  indicedeayudas() { }

  verAyuda() {
    this.mostrarAyuda = !this.mostrarAyuda;
  }

  estadoAyuda( estado ) {
    this.mostrarAyuda = estado;
  }

  buscar( datosForm ) {
    this.lbgcg100Id102Params.loading = true;
    const datosAux = [];
    this.gli02q5 = new Gli02q5();
    this.gli02q5.input.Cpais.item = [];
    this.gli02q5.input.Cpais.item[0] = datosForm.CPAIS_100 !== null ? ( datosForm.CPAIS_100 !== '' ? datosForm.CPAIS_100 : 0 ) : 0;
    this.gli02q5.input.Xpais.item = [];
    this.gli02q5.input.Xpais.item[0] = datosForm.XPAIS_101 !== null ? datosForm.XPAIS_101 : '';

    const suscripcion = this.wsgls02Service.QueryPais( this.gli02q5 ).subscribe( (response: any) => {
      if ( Array.isArray(response.output.Cdir3.item) ) {
        this.glo02q5 = response;
      } else {
        const aux = response.output.Cdir3.item;
        response.output.Cdir3.item = [];
        response.output.Cdir3.item[0] = aux;
        this.glo02q5 = response;
      }

      if ( Array.isArray(response.output.Glbdpais.item) ) {
        this.glo02q5 = response;
      } else {
        const aux = response.output.Glbdpais.item;
        response.output.Glbdpais.item = [];
        response.output.Glbdpais.item[0] = aux;
        this.glo02q5 = response;
      }

      for ( let i = 0; i < this.glo02q5.output.Numfilas; i++ ) {
        datosAux.push({  CPAIS: this.glo02q5.output.Glbdpais.item[i].Cpais,
                              XPAIS: this.glo02q5.output.Glbdpais.item[i].Xpais,
                              DNACIONA: this.glo02q5.output.Glbdpais.item[i].Dnaciona,
                              CDIR3: this.glo02q5.output.Cdir3.item[i],
                              _detalle_: true,
                              _editar_: true,
                              _borrar_: true });
      }
      this.lbgcg100Id102Params.value = datosAux;
      this.lbgcg100Id102Params.loading = false;
      suscripcion.unsubscribe();
    },
    err => {
      // Mostrar mensaje notificación
      if ( !err.error.hasOwnProperty('ARQSVC') ) {
        this.messageService.add( new MessageError( 'En la llamada al servidor remoto' ) );
      } else {
        this.messageService.add( new MessageError( err.error.ARQSVC.ArqErrAplMsgArea ) );
      }
      this.lbgcg100Id102Params.loading = false;
      if ( suscripcion !== null ) {
        suscripcion.unsubscribe();
      }
    });
  }

}
