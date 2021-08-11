import React, { useState, lazy, Suspense } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useStyles } from './FormAlumnoStyled'
import { getFirestore } from '../../../firebase/firebaseConfig';



export default function FormAlumno({estadoAlumnos}) {
    const [formData, setFormData] = useState(initialValue)
    const [validate, setValidate] = useState(false);

    const db = getFirestore()
    const classes = useStyles();

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            fc: new Date() 
        })
    }

    const createAlumnoFirestore = async () => {
        await db.collection('alumnos').add(formData)        
        .then((res) => {
            console.log(res);  
                           
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();                
        //event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } 
        setValidate(true);          
        createAlumnoFirestore()
        setFormData(initialValue)
        estadoAlumnos()  
    }; 

    //console.log('renderizar form allumno');
    return (
        <>
            {/* <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography> */}
            <form className={classes.form}  onSubmit={handleSubmit} validate={validate} onChange={handleOnChange} >
                <Grid container spacing={3}>                    
                    {/* <Grid item xs={12} sm={6}> */}
                    <Grid item xs={12}>
                        <TextField
                        type="text"
                        required
                        id="nom"
                        name="nom"
                        label="Nombre y Apellido"
                        fullWidth
                        autoComplete="given-name"
                        value={formData.nom}
                        />
                    </Grid>                  
                    <Grid item xs={12}>
                        <TextField
                        type="email"
                        required
                        id="email"
                        name="email"
                        label="ejemplo@gmail.com"
                        fullWidth
                        autoComplete="family-name"
                        value={formData.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        type="text"
                        required
                        id="tel"
                        name="tel"
                        label="Teléfono"
                        fullWidth
                        autoComplete="family-name"
                        value={formData.tel}
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
                    REGISTRAR ALUMNO
                </Button>
            </form>
        </>
    );
}
const initialValue = {
    nom: "",
    email:"",
    tel:"",
    beca:"ninguna",
    area:"ninguna",
    estado:"libre",
    dir: "",
    pais: "",
    prov: "",
    ciu: "",
    cp: "",
    act: true,     
    fechaInicio: ''    
}