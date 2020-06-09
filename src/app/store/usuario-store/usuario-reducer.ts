import { UsuarioState } from './usuario-state';
import { IAction } from '@dipujaen/dpj-models-shared';
import { ACTION_CAMBIAR_USUARIO } from './usuario-action';

const initialState: UsuarioState = {
    usuario: ''
};

export function usuarioReducer(state = initialState, action: IAction): UsuarioState {
    switch ( action.type ) {
        case ACTION_CAMBIAR_USUARIO:
            return {
                ...state, usuario: action.payload
            };
    }

    return state;
}
