import { ActionReducerMap } from '@ngrx/store';
import { AppStore } from './app-store';
import { usuarioReducer } from './usuario-store/usuario-reducer';

export const rootReducer: ActionReducerMap<AppStore> = {
    usuarioState: usuarioReducer
};
