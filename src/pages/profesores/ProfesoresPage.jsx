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

function ProfesoresPage(props) {
    const [profesores, setProfesores] = useState([])
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
        db.collection('profesores').get()
        .then(resp => {
          setProfesores(resp.docs.map(pro => ({ ...pro.data(), id: pro.id })))
          setLoading(true)
        })
        //cambiarEstadoListaAlummno()
    },[actualizarListadoMaterias])

    console.log(profesores);
    return (
        <>
            <OftadehLayout>
                <h1>Profesores</h1>
                <OftadehBreadcrumbs path={history} />
                <Paper style={{ padding: "5px" }}>
                <SimpleAccordionForm NombreBotonDesplegable="AGREGAR PROFESOR">
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
                    <TableMaterias data={profesores}/>
                    :
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                      <CircularProgress disableShrink />
                    </Box>
                }
            </OftadehLayout>
        </>
    )
}

export default ProfesoresPage
