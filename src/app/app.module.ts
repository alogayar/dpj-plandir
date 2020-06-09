import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

// DEPENDENCIES
import { DpjComponentsSharedModule } from '@dipujaen/dpj-components-shared';
import { DpjServicesPdwService } from '@dipujaen/dpj-services-pdw';
import { DpjServicesArqService } from '@dipujaen/dpj-services-arq';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PRIMENG
import { MessageService } from 'primeng/api';

// REDUX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootReducer } from './store/root-reducer';
import { ReduxService } from './services/redux.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot( rootReducer, {} ),
    StoreDevtoolsModule.instrument( { maxAge: 20 } ),
    DpjComponentsSharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ MessageService, ReduxService, DpjServicesPdwService, DpjServicesArqService,
    { provide: 'ENDPOINT', useValue: environment.endpointWSO2 },
    { provide: 'USUARIO', useFactory: () => { /* Función para obtenerlo*/ } },
    { provide: 'IDAPLICA', useValue: environment.idaplica },
    { provide: 'NUMFILAS', useValue: environment.numfilas },
    { provide: 'CUTRAMIT', useFactory: () => { /* Función para obtenerlo*/ } },
    { provide: 'TOKEN', useFactory: () => { /* Función para obtenerlo*/ } },
    { provide: 'API_URL', useValue: environment.apiUrl } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
