import React, {useState} from 'react'
import AuthContext from './authContext'
import useAutenticacion from '../../hooks/useAuthentication';

export const AuthProvider = ({children}) => {
    
    
    const usuario = useAutenticacion()



    return (
        <AuthContext.Provider value={{
            usuario
        }}>
            {children}
        </AuthContext.Provider>
    )
}
