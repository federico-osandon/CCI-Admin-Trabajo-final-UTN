import React from 'react'
import { Link } from 'react-router-dom'
import  { getFirestore } from '../../../firebase/firebaseConfig'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  }); 


function TableMaterias({data, cambiarEstadoMateria}) {
    const classes = useStyles();
    //console.log(data.length);
    const db = getFirestore()

    const hadlerOnClick = async (id) => {
        console.log('Eliminando', id)
        const query =  db.collection('materias').doc(id)
        query.update({activa: 1})
        .then(resp =>{ 
            console.log('Eliminado', resp)
            cambiarEstadoMateria()
        })
    }
    
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Aula</TableCell>
                    <TableCell align="right">Pofesor</TableCell>
                    <TableCell align="right">Día</TableCell>
                    <TableCell align="right">Hora</TableCell>
                    <TableCell align="right">Acción</TableCell>
                    {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                </TableHead>
                {data.length===0 && <p>NO HAY MATERIAS ACTIVAS</p>}
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                            {row.nombre}
                            </TableCell>
                            <TableCell align="right">{row.aula}</TableCell>
                            <TableCell align="right">{row.profesor}</TableCell>
                            <TableCell align="right">{row.dia}</TableCell>
                            <TableCell align="right">{row.horario}</TableCell>                            
                            <TableCell align="right">
                            <>
                                <Link to={`/pages/materia/${row.id}`} style={{textDecoration: 'none'}}> 
                                    <Button variant="contained" color="primary">
                                        VER
                                    </Button>                                             
                                </Link>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => hadlerOnClick(row.id)}
                                >
                                    BAJA
                                </Button> 
                            </>  
                            </TableCell>
                            {/* <TableCell align="right"></TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableMaterias
