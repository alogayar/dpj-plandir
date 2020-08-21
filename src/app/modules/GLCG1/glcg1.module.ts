import { NgModule } from '@angular/core';
import { DpjComponentsSharedModule } from '@dipujaen/dpj-components-shared';
import { FieldsetModule } from 'primeng/fieldset';
import { GLCG1_ROUTING } from './glcg1.routes';
import { CommonModule } from '@angular/common';
import { Glcg102Component } from './glcg102/glcg102.component';
import { Glcg100Component } from './glcg100/glcg100.component';
import { Wsgls02Service } from '@dipujaen/dpj-services-fcp-gl';

import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [Glcg102Component,
                Glcg100Component,
                ],
  imports: [
    DpjComponentsSharedModule,
    FieldsetModule,
    CommonModule,
    GLCG1_ROUTING,
    HttpClientModule
  ],
  exports: [Glcg102Component,
            Glcg100Component,
            ],
  providers: [Wsgls02Service]
})
export class Glcg1Module { }

