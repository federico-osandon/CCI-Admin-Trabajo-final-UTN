import {useState, useEffect} from 'react'
import { Paper } from '@material-ui/core'
import React, {useContext} from 'react'
import OftadehBreadcrumbs from '../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import OftadehLayout from '../../components/OftadehLayout/OftadehLayout'
import AuthContext from '../../context/ Authentication/authContext'
import FormMateria from './components/FormMateria'
import MUIDataTable from "mui-datatables";
import SimpleAccordionForm from './components/SimpleAccordionForm'
import { getFirestore } from '../../firebase/firebaseConfig'
import TableMaterias from './components/TableMaterias'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box'



const columns = [
    {
      name: "nombre",
      label: "Materia",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "aula",
      label: "Aula",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "profesor",
      label: "Profesor",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "dia",
      label: "Día",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "horario",
      label: "Hora",
      options: {
        filter: true,
        sort: true
      }
    }
  ];
  
//   const data = [
//     {
//         nombre: "Learn Javascript",
//         aula: "Mohammad Oftadeh",
//         profesor: "javascript",
//         dia: "web, javascript",
//         horario: "12-12-2020"
//     },
//     {
//         nombre: "Learn Javascript",
//         aula: "Mohammad Oftadeh",
//         profesor: "javascript",
//         dia: "web, javascript",
//         horario: "12-12-2020"
//     }
    
//   ];
  
  const options = {
    filterType: "checkbox"
  };

function MateriasPage(props) {
    const [materias, setMaterias] = useState([])
    const [loading, setLoading] = useState(false)
    const [actualizarListadoMaterias, setActualizarListadoMaterias] = useState(false)

    const { history } = props

    const { usuario } = useContext(AuthContext)
    if (!usuario) {
        history.push('/pages/auth/login')
    }

    const cambiarEstadoListaMaterias = () => {
        setActualizarListadoMaterias(!actualizarListadoMaterias)
    }

    useEffect(()=>{
        const db = getFirestore()
        db.collection('materias').where('activa', '==', 2).get() //.where('activa', '==', 2)
        .then(resp => {
          setMaterias(resp.docs.map(mat => ({ ...mat.data(), id: mat.id })))
          setLoading(true)
        })
        return () => {
          console.log('cleaned up');
          
       }
        //cambiarEstadoListaAlummno()
    },[actualizarListadoMaterias])

    console.log(materias);
    return (
        <>
            <OftadehLayout>
                <h1>Materias</h1>
                <OftadehBreadcrumbs path={history} />
                <Paper style={{ padding: "5px" }}>
                <SimpleAccordionForm NombreBotonDesplegable="Nueva Materia">
                    <FormMateria cambiarEstadoMateria={cambiarEstadoListaMaterias}/>
                </SimpleAccordionForm> 
                </Paper>
                
                {loading ?
                    // <MUIDataTable
                    //     title={"Listado de Materias"}
                    //     data={materias}
                    //     columns={columns}
                    //     options={options}
                    // />
                    <TableMaterias data={materias} cambiarEstadoMateria={cambiarEstadoListaMaterias}/>
                    :
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                      <CircularProgress disableShrink />
                    </Box>
                }
            </OftadehLayout>
        </>
    )
}

export default MateriasPage
