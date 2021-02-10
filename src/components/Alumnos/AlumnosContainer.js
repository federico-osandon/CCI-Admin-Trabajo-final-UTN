import React, { useEffect } from 'react'
import AlumnosList from './AlumnosList'
import { getFirestore } from '../../utils/firebaseApp'


function AlumnosContainer() {
    useEffect(() => {
        const db = getFirestore()
        const alumnos = db.collection('alumnos').get()
        alumnos.then(resp => console.log(resp.docs))
        
    }, [])
    console.log();
    return (
        <>
            <AlumnosList />
        </>
    )
}

export default AlumnosContainer
