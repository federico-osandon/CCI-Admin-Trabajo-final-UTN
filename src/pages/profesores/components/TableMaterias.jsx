import React from 'react'
import { Link } from 'react-router-dom'
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
  
//   function createData(name, calories, fat, carbs) {
//     return { name, calories, fat, carbs };
//   }
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24),
//     createData('Ice cream sandwich', 237, 9.0, 37),
//     createData('Eclair', 262, 16.0, 24),
//     createData('Cupcake', 305, 3.7, 67),
//     createData('Gingerbread', 356, 16.0, 49),
//   ];

function TableMaterias({data}) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Email</TableCell>                    
                    {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row"alumno>
                            {row.nom}
                            </TableCell>
                            <TableCell align="right">{row.email}</TableCell>                                                        
                            <TableCell align="right">
                            <>
                                <Link to={`/pages/materia/${row.id}`} style={{textDecoration: 'none'}}> 
                                    <Button variant="contained" color="primary">
                                        VER
                                    </Button>                                             
                                </Link>
                                <Button variant="contained" color="secondary">
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
