import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";

// DEPENDENCIES
import { DpjComponentsSharedModule } from "@dipujaen/dpj-components-shared";
import { DpjServicesPdwService } from "@dipujaen/dpj-services-pdw";
import { DpjServicesArqService } from "@dipujaen/dpj-services-arq";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

// PRIMENG
import { MessageService } from "primeng/api";
import { TabViewModule } from "primeng/tabview";

// REDUX
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { rootReducer } from "./store/root-reducer";
import { ReduxService } from "./services/redux.service";
import { HomeComponent } from "./components/home/home.component";
import { AccesoComponent } from "./components/acceso/acceso.component";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ContentComponent } from "./components/content/content.component";
import { AuthGuard } from "./guards/auth.guard";

// MODULOS

import { Glcg1Module } from "./modules/GLCG1/glcg1.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccesoComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer, {}),
    StoreDevtoolsModule.instrument({ maxAge: 20 }),
    DpjComponentsSharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    Glcg1Module,
    TabViewModule,
  ],
  providers: [
    MessageService,
    ReduxService,
    DpjServicesPdwService,
    DpjServicesArqService,
    AuthGuard,
    { provide: "ENDPOINT", useValue: environment.endpointWSO2 },
    {
      provide: "USUARIO",
      useFactory: (reduxService: ReduxService) =>
        reduxService.getUsuarioState().subscribe((usuario) => usuario),
      deps: [ReduxService],
      multi: true,
    },
    { provide: "IDAPLICA", useValue: environment.idaplica },
    { provide: "NUMFILAS", useValue: environment.numfilas },
    {
      provide: "CUTRAMIT",
      useFactory: () => {
        /* Función para obtenerlo*/
      },
    },
    { provide: "API_URL", useValue: environment.apiUrl },
    { provide: "CLAVE_URL", useValue: environment.claveUrl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
