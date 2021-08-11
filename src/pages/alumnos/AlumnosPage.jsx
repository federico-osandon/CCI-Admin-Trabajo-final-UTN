import React, { useState, useContext, useEffect, lazy, Suspense } from 'react'
import AuthContext from '../../context/ Authentication/authContext'
//import  Paper  from '@material-ui/core/Paper'
//import OftadehBreadcrumbs from '../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
//import OftadehLayout from '../../components/OftadehLayout/OftadehLayout'
// import './AlumnPage.css'
//import MUIDataTable from "mui-datatables";
//import SimpleAccordionForm from './components/SimpleAccordionForm'
import  { getFirestore } from '../../firebase/firebaseConfig'
import TableAlumnos from './components/TableAlumnos'

//const AuthContext = lazy( ()=> import("../../context/ Authentication/authContext") )
const Paper = lazy( ()=> import("@material-ui/core/Paper") )
const OftadehBreadcrumbs = lazy( ()=> import("../../components/OftadehBreadcrumbs/OftadehBreadcrumbs") )
const OftadehLayout = lazy( ()=> import("../../components/OftadehLayout/OftadehLayout") )
const MUIDataTable = lazy( ()=> import("mui-datatables") )
const SimpleAccordionForm = lazy( ()=> import("./components/SimpleAccordionForm") )
//const { getFirestore } = lazy( ()=> import("../../firebase/firebaseConfig") )



const columns = [
    {
        name: "nom",
        label: "Nombre",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "email",
        label: "Email",
        options: {
            filter: true,
            sort: false
        }
    },
    {
        name: "tel",
        label: "Whatsapp",
        options: {
            filter: true,
            sort: false
        }
    },    
    {
        name: "accion",
        label: "Acción",
        options: {
            filter: true,
            sort: false
        }
    }
    // {
    //     name: "estado",
    //     label: "Estado",
    //     options: {
    //         filter: true,
    //         sort: true
    //     }
    // }
  ];   
  
    const options = {
        filterType: "checkbox"
    };

function AlumnosPage(props) {
    const [alumnos, setAlumnos] = useState([])
    const [loading, setLoading] = useState(false)
    const [actualizarListadoAlumnos, setActualizarListadoAlumnos] = useState(false)
    

    const { history } = props
    const { usuario } = useContext(AuthContext)
    if (!usuario) {
        history.push('/pages/auth/login')
    }

    const cambiarEstadoListaAlummno = () => {
        setActualizarListadoAlumnos(!actualizarListadoAlumnos)
    }
    
    useEffect(()=>{
        const db = getFirestore()
        db.collection('alumnos').get()
        .then(resp => setAlumnos(resp.docs.map(alumno => ({ ...alumno.data(), id: alumno.id }))))
        setLoading(true)
        //cambiarEstadoListaAlummno()
    },[actualizarListadoAlumnos])

    console.log(alumnos);

    return (
        <>
            <OftadehLayout>
                <h1>Alumnos</h1>
                <OftadehBreadcrumbs path={history} />
                <Paper style={{ padding: "5px" }}>
                <SimpleAccordionForm estadoAlumnos={cambiarEstadoListaAlummno} />
                </Paper>
                {loading ?
                    // <MUIDataTable
                    //     title={"Posts List"}
                    //     data={alumnos}
                    //     columns={columns}                        
                    //     options={options}
                    //     actions={[
                    //         {
                    //             icon: 'edit',
                    //             tooltip: 'Editar Alumno',
                    //             onClick: (event)=>alert('funcion')
                    //         }
                    //     ]}
                    // />
                    <TableAlumnos data={alumnos}/>
                    :
                    <h2>Cargando... </h2>
                }
            </OftadehLayout>
        </>
    )
}

export default AlumnosPage
