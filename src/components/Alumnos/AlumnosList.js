import React, {useState, useEffect, lazy, Suspense } from 'react'
import { MDBRow } from 'mdbreact';
import  {getFirestore}  from '../../utils/firebaseApp'
import AlumnoItem from './AlumnoItem';


function AlumnosList() {

    const [aLumnoList, setALumnoList] = useState(null)
    const [loading, setLoading] = useState(false)

    const db = getFirestore()

    useEffect(()=>{
        db.collection('alumnos').get()
        .then(resp => {
            console.log(resp.docs[0].data());
            setALumnoList(resp.docs.map(alu => ({...alu.data(), id: alu.id})))
            setLoading(true)
        })
    },[])

    console.log(aLumnoList);
    return (
        <>
            {!loading ? <h2>Cargando...</h2> :
                <MDBRow className="justify-content-center">
                    {aLumnoList.map(alu => (
                        <AlumnoItem alu={alu} />
                    ))}
                </MDBRow>
            }        
        </>
    )
}

export default AlumnosList
