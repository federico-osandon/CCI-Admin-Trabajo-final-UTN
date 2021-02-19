import React, {useState, useEffect, lazy, Suspense } from 'react'
import { MDBRow } from 'mdbreact';
import  {getFirestore}  from '../../utils/firebaseApp'
import AlumnoItem from './AlumnoItem';


function AlumnosList({alum = []}) {

    //const [aLumnoList, setALumnoList] = useState(null)
    

    //const db = getFirestore()

    // useEffect(()=>{
    //     db.collection('alumnos').get()
    //     .then(resp => {
    //         //console.log(resp.docs[0].data());
    //         setALumnoList(resp.docs.map(alu => ({...alu.data(), id: alu.id})))
    //         setLoading(true)
    //     })
    // },[estadoLista])

    //console.log(alum);
    if (alum.length < 1) {
        return <h2>No Hay alumnos registrados.</h2>
    }
    return (
        <>            
            <MDBRow className="justify-content-center">
                {alum.map(alu => (
                    <AlumnoItem key={alu.id} alu={alu} />
                ))}
            </MDBRow>                    
        </>
    )
}

export default AlumnosList
