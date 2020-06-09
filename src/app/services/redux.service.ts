import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/app-store';
import { Observable } from 'rxjs';
import { IAction } from '@dipujaen/dpj-models-shared';
import { UsuarioState } from '../store/usuario-store/usuario-state';


@Injectable({
    providedIn: 'root'
})
export class ReduxService {

    constructor( private store: Store<AppStore> ) { }

    getUsuarioState(): Observable<UsuarioState> {
        return this.store.select( 'usuarioState' );
    }

    updateState( action: IAction ) {
        this.store.dispatch( { type: action.type, payload: action.payload } );
    }

}
