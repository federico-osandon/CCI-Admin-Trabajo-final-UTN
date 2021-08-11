import React, { useState, lazy, Suspense } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app'
import 'firebase/firestore'

import { useStyles } from './FomrMateriaStyled'
import { getFirestore } from '../../../firebase/firebaseConfig';



export default function FormMateria({cambiarEstadoMateria}) {
    const [formDataMateria, setFormDataMateria] = useState(initialValue)
    const [validate, setValidate] = useState(false);
    const db = getFirestore()
    const classes = useStyles();

    const handleOnChange = (e) => {
        setFormDataMateria({
            ...formDataMateria,
            [e.target.name]: e.target.value,
            //dia: firebase.firestore.Timestamp.fromDate(materia.dia)
        })
    }

    const createMateriaFirestore = async () => {
        await db.collection('profesores').add(formDataMateria)        
        .then((res) => {
            console.log(res);  
                           
        })
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
        setFormDataMateria(initialValue)
        cambiarEstadoMateria()  
    }; 

    //console.log(formDataMateria);
    return (
        <>
            {/* <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography> */}
            <form className={classes.form} validate={validate} onChange={handleOnChange} onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        type="text"
                        required
                        id="nombre"
                        name="nombre"
                        label="Nombre del Profesor"
                        fullWidth
                        autoComplete="given-name"
                        value={formDataMateria.nombre}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                        type="email"
                        required
                        id="email"
                        name="email"                        
                        label="Email"
                        fullWidth
                        autoComplete="given-name"
                        value={formDataMateria.aula}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                        type="text"
                        required
                        id="profesor"
                        name="profesor"
                        label="Profesor de la materia"
                        fullWidth
                        autoComplete="family-name"
                        value={formDataMateria.profesor}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        type="text"
                        required
                        id="dia"
                        name="dia"
                        label="Día de la materia"
                        fullWidth
                        autoComplete="family-name"
                        value={formDataMateria.dia}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>                        
                        <TextField
                        type="number"
                        required
                        id="horario"
                        name="horario"
                        label="Horario de dictado de la materia"
                        fullWidth
                        autoComplete="shipping address-line1"
                        value={formDataMateria.horario}
                        />
                    </Grid>                    */}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    REGISTRAR PROFESOR
                </Button>
            </form>
        </>
    );
}
const initialValue = {
    activa:2,
    email: '',    
    fCreacion: firebase.firestore.Timestamp.fromDate(new Date()),   // se crea por defecto        
    nombre: '',
        
}