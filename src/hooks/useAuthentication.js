import React, { useEffect, useState } from 'react';
import {getAuth} from '../firebase/firebaseConfig';

function useAutenticacion() {
    const usuario = async () =>{//para probar
        return await localStorage.getItem('usuario')
    }
    
    const [ usuarioAutenticado, guardarUsuarioAutenticado] = useState(usuario)

    useEffect( () => {
        const unsuscribe = getAuth().onAuthStateChanged(user => {
            if( user ) {
                guardarUsuarioAutenticado(user);
            } else {
                guardarUsuarioAutenticado(null);
            }
        });
        return async () => await unsuscribe()
    }, []);

    return usuarioAutenticado;
}
export default useAutenticacion;

// const usuario= 