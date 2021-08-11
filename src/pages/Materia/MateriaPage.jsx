import React, { useState, useContext, useEffect, lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../context/ Authentication/authContext'

import  { getFirestore } from '../../firebase/firebaseConfig'
import SimpleAccordionForm from './components/SimpleAccordionForm'
import FormMateria from './components/FormMateria'
import useGetAlumn from './components/useGetAlumn'
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';


const Paper = lazy( ()=> import("@material-ui/core/Paper") )
const OftadehBreadcrumbs = lazy( ()=> import("../../components/OftadehBreadcrumbs/OftadehBreadcrumbs") )
const OftadehLayout = lazy( ()=> import("../../components/OftadehLayout/OftadehLayout") )

   
function MateriaPage(props) { 
    const [materia, setMateria] = useState({})
    const [alumnosID, setAlumnoID] = useState([])
    const [alumno, setAlumno] = useState([])
    const [loading, setLoading] = useState(true)
    const [estadoMateria, setEstadoMateria] = useState(true)
    const [buscar, setBuscar] = useState('')
    
    const { id } = useParams()
    const { history } = props
    
    const { usuario } = useContext(AuthContext)
    if (!usuario) {
        history.push('/pages/auth/login')
    } 
    const db = getFirestore()

    const queryMaterias = db.collection('materias').doc(id)
    
    useEffect( () => {         
        queryMaterias.get()
        .then(mat => {
            setMateria({id: id, ...mat.data()})
            setLoading(false)
        })
        .catch(err => console.log(err))        
    }, [id, estadoMateria])   

    const  [alumList,setAlumList] = useGetAlumn()//usa un custome hook

    const cambiarEstadoMateria =()=>{
        setEstadoMateria(!estadoMateria)
       
    }    
    
    const busquedaEnList =(e)=>{
        e.preventDefault()
        console.log(e.target.value)
        setBuscar(e.target.value)
        filtrarElementos()
    }
    
    const filtrarElementos = ()  =>{
        let search = alumList.filter(alu => {
            if( alu.nom.includes(buscar) ){
                return alu
            }
        })
        setAlumno(search)
    }
    
    //console.log(alumList)
    return (
        <>  
            
            <OftadehLayout>
                {loading? 
                        <h1>Cargando...</h1>
                    :                
                        <>
                            <h1>Tablero de Materia: {materia.nombre}</h1>
                            <OftadehBreadcrumbs path={history} />
                            <SimpleAccordionForm NombreBotonDesplegable="Actualizar Materia">
                                <FormMateria 
                                    materia={materia}
                                    cambiarEstadoMateria={cambiarEstadoMateria}
                                />
                            </SimpleAccordionForm>
                            <Paper style={{ padding: "15px" }}>                    
                                <h3>Datos de la Materia</h3>
                                <p>Nombre: {materia.nombre}</p>
                                <p>Profesor: {materia.profesor}</p> 
                                <p>Aula: {materia.aula} </p>
                                <p>Horario: {materia.horario}</p>
                                <p>Día: {materia.dia}</p>                                    
                            </Paper>
                            <Paper style={{ padding: "15px", marginTop: '15px' }}>
                                <section>
                                    Pagos <a href="https://mpago.la/2J1twS6"><button>Pagar</button></a>
                                </section>
                            </Paper>
                                                       
                            <Paper style={{ padding: "15px", marginTop: '15px' }}>
                                <form>
                                    {/* <input 
                                        type="text" 
                                        placeholder="buscar" 
                                        name='buscar'
                                        value={buscar}
                                        onChange={busquedaEnList}
                                    /> */}
                                    <TextField 
                                        type="text" 
                                        name='buscar'                                        
                                        label="Buscar" 
                                        variant="outlined" 
                                        value={buscar}
                                        onChange={busquedaEnList}
                                    />
                                </form>
                            </Paper>
                            <TableBody>
                                {alumList.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                        {row.nombre}
                                        </TableCell>
                                        <TableCell align="right">{row.nom}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.estado}</TableCell>
                                        <TableCell align="right">{row.beca}</TableCell>                            
                                        <TableCell align="right">{row.area}</TableCell>                            
                                        <TableCell align="right">
                                        <>
                                        
                                        </>  
                                        </TableCell>
                                        {/* <TableCell align="right"></TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </>
            }
            </OftadehLayout>
        </>
    )
}

export default MateriaPage
