import React, { useState, useContext, useEffect, lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../context/ Authentication/authContext'

import  { getFirestore } from '../../firebase/firebaseConfig'
//import TableAlumnos from './components/TableAlumnos'

//const AuthContext = lazy( ()=> import("../../context/ Authentication/authContext") )
const Paper = lazy( ()=> import("@material-ui/core/Paper") )
const OftadehBreadcrumbs = lazy( ()=> import("../../components/OftadehBreadcrumbs/OftadehBreadcrumbs") )
const OftadehLayout = lazy( ()=> import("../../components/OftadehLayout/OftadehLayout") )
// const MUIDataTable = lazy( ()=> import("mui-datatables") )
// const SimpleAccordionForm = lazy( ()=> import("./components/SimpleAccordionForm") )



   
function AlumnoPage(props) { 
    const [alumno, setAlumno] = useState({})
    const { id } = useParams()
    const { history } = props
    
    const { usuario } = useContext(AuthContext)
    if (!usuario) {
        history.push('/pages/auth/login')
    } 
    
    useEffect(() => {
        const db = getFirestore()
        const query = db.collection('alumnos').doc(id)
        query.get()
        .then(alum => setAlumno({id: id, ...alum.data()}))
        .catch(err => console.log(err))        
    }, [])

    console.log(alumno);

    return (
        <>
            <OftadehLayout>
                <h1>Tablero del Alumno: {alumno.nom}</h1>
                <OftadehBreadcrumbs path={history} />
                <Paper style={{ padding: "5px" }}>
                    <h3>Datos del Alumno</h3>
                    <p>EmailL: {alumno.email}</p>
                    <p>Tel: {alumno.tel}</p>
                    <p>Beca: {alumno.beca} </p>
                    <p>Area: {alumno.area}</p>
                    <p>Condición: {alumno.estado} <button>EDITAR</button></p>                   
                </Paper>
                    <section>
                        Materias
                        
                        <div>
                            <h4>Nombre de la materia</h4>
                            <div>
                                <p>Notas: </p>
                                <p>Asistencia: </p>
                            </div>
                        </div>
                    </section>
                    <section>
                        Pagos
                    </section>
                    <section>
                        etc
                    </section>
                    <section>

                    </section>
            </OftadehLayout>
        </>
    )
}

export default AlumnoPage
