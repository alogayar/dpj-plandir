import { RouterModule, Routes } from '@angular/router';
import { Glcg100Component } from './glcg100/glcg100.component';
import { Glcg102Component } from './glcg102/glcg102.component';

const GLCG1_ROUTES: Routes = [
    { path: 'glcg1', component: Glcg100Component },
    { path: 'glcg1/glcg100', component: Glcg100Component },
    { path: 'glcg1/glcg102', component: Glcg102Component }
];

export const GLCG1_ROUTING = RouterModule.forRoot(GLCG1_ROUTES);
