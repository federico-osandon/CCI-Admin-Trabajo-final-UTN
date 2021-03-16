import React, { useEffect, useState } from 'react';
import {getAuth} from '../firebase/firebaseConfig';

function useAutenticacion() {
    const [ usuarioAutenticado, guardarUsuarioAutenticado] = useState(JSON.parse(sessionStorage.getItem('usuario')));

    useEffect( () => {
        const unsuscribe = getAuth().onAuthStateChanged(user => {
            if( user ) {
                guardarUsuarioAutenticado(user);
            } else {
                guardarUsuarioAutenticado(null);
            }
        });
        return async () => await unsuscribe();
    }, []);

    return usuarioAutenticado;
}
export default useAutenticacion;

// const usuario= 