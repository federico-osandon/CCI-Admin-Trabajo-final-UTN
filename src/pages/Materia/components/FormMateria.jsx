import React, { useState, lazy, Suspense } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import firebase from 'firebase/app'
import 'firebase/firestore'

import { useStyles } from './FomrMateriaStyled'
import { getFirestore } from '../../../firebase/firebaseConfig';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Box from '@material-ui/core/Box'
// import FormControl from '@material-ui/core/FormControl'



export default function FormMateria({materia, cambiarEstadoMateria}) {
    
    const [ dataMateria, setDataMateria ] = useState(materia)    
    const [validate, setValidate] = useState(false);
    const db = getFirestore()
    const classes = useStyles();

    const handleOnChange = (e) => {
        setDataMateria({
            ...dataMateria,
            [e.target.name]: e.target.value,
            //dia: firebase.firestore.Timestamp.fromDate(materia.dia)
        })
    }

    const createMateriaFirestore = () => {
        console.log(dataMateria.id)
        db.collection('materias').doc(dataMateria.id).update(dataMateria)        
        .then((res) => {
            console.log(res);                            
        })
        .catch(err => console.log(err))
    }
    
    const handleSubmit = (event) => {        
        event.preventDefault();                
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } 
        setValidate(true);          
        createMateriaFirestore()
        alert('La materia se actualizó..')
        cambiarEstadoMateria()  
    }; 
    console.log(dataMateria);
    return (
        <>
            {/* <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography> */}
{/*             
            <Box display="flex" justifyContent="center" m={1} p={1}>
                <CircularProgress disableShrink />
            </Box> */}
            <form 
                className={classes.form} 
                validate={validate} 
                onChange={handleOnChange} 
                onSubmit={handleSubmit}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            required
                            id="nombre"
                            name="nombre"
                            //label="Nombre de la Materia"
                            fullWidth
                            autoComplete="given-name"
                            defaultValue ={dataMateria.nombre}
                        />
                    </Grid>                   
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            required
                            id="aula"
                            name="aula"                        
                            //label="Aula"
                            fullWidth
                            autoComplete="given-name"
                            value={dataMateria.aula}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            required
                            id="profesor"
                            name="profesor"
                            //label="Profesor de la materia"
                            fullWidth
                            autoComplete="family-name"
                            value={dataMateria.profesor}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            required
                            id="dia"
                            name="dia"
                            //label="Día de la materia"
                            fullWidth
                            autoComplete="family-name"
                            value={dataMateria.dia}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>                        
                        <TextField
                        type="number"
                        required
                        id="horario"
                        name="horario"
                        //label="Horario de dictado de la materia"
                        fullWidth
                        autoComplete="shipping address-line1"
                        value={dataMateria.horario}
                        />
                    </Grid>                   
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    MDIFICAR MATERIA
                </Button>
            </form>     
        </>
    )
}
