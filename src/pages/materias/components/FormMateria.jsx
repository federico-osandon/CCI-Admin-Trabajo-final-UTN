import React, { useState, lazy, Suspense } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useStyles } from './FomrMateriaStyled'



export default function FormMateria() {
    const [materia, setMateria] = useState(initialValue)

    const classes = useStyles();

    const handleOnChange = (e) => {
        setMateria({
            ...materia,
            [e.target.name]: e.target.value
        })
    }

    console.log(materia);
    return (
        <>
            {/* <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography> */}
            <form className={classes.form} noValidate onChange={handleOnChange} >

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        type="string"
                        required
                        id="name"
                        name="name"
                        label="Nombre de la Materia"
                        fullWidth
                        autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        type="date"
                        required
                        id="fechaInicio"
                        name="fechaInicio"                        
                        label="______________________Fecha de inicio"
                        fullWidth
                        autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        id="profesorMateria"
                        name="profesorMateria"
                        label="Profesor de la materia"
                        fullWidth
                        autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        id="dia"
                        name="dia"
                        label="Día de la materia"
                        fullWidth
                        autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        id="hs"
                        name="hs"
                        label="Horario de dictado de la materia"
                        fullWidth
                        autoComplete="shipping address-line1"
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                        <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        />
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                        />
                    </Grid> */}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    REGISTRAR MATERIA
                </Button>
            </form>
        </>
    );
}
const initialValue = {
    name: '',
    profesorMateria: '',
    dia: '',
    hs:'',
    fechaInicio: '',
    fechaCre: ''
}