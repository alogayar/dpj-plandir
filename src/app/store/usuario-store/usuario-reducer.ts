import { UsuarioState } from './usuario-state';
import { IAction } from '@dipujaen/dpj-models-shared';
import { ACTION_CAMBIAR_USUARIO, ACTION_CAMBIAR_TOKEN } from './usuario-action';

const initialState: UsuarioState = {
    cusuario: '',
    tokenUsuario: ''
};

export function usuarioReducer(state = initialState, action: IAction): UsuarioState {
    switch ( action.type ) {
        case ACTION_CAMBIAR_USUARIO:
            return {
                ...state, cusuario: action.payload
            };
        case ACTION_CAMBIAR_TOKEN:
            return {
                ...state, tokenUsuario: action.payload
            };
    }

    return state;
}
