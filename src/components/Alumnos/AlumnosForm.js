import React, { useState } from 'react'
import { Form, Col, Button, Container, Row } from 'react-bootstrap'
import {getFirestore} from '../../utils/firebaseApp'
import 'firebase/firebase'


export const AlumnosForm = ({actListAlum, listAlum}) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(initialValueForm);

    const db = getFirestore()

    const onChange = (e) => {        
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,  
            fc: Date.now()         
        })  
              
    } 
    //console.log(formData)
    const createAlumnoFirestore = async () => {
        const setAlum = db.collection('alumnos')
        // console.log(setAlum)
        // console.log(formData)
        setAlum.add(formData)
        .then((res) => {
            console.log(res);
            actListAlum(!listAlum)
            setFormData(initialValueForm)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();                
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
          return
        }    
        setValidated(true);    
        createAlumnoFirestore()
        console.log(form.target.target);
    };      
    
    //console.log(formData)
    //className="shadow-lg p-3 mb-5 bg-body rounded"
    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col 
                        className="shadow-lg p-5 mb-5 bg-body rounded" 
                        xs 
                        ls={8} 
                        md={8} 
                    >
                        <Form                             
                            noValidate 
                            validated={validated} 
                            onSubmit={handleSubmit} 
                            onChange={onChange}
                        >                            

                            <Form.Group as={Col} controlId="formGridEmail" >
                                <Form.Label>Nombre y apellido</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="nom"  
                                    value={formData.nom}                                                                    
                                    placeholder="Ingrese el nombre y apelldido"
                                    required 
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email" 
                                    value={formData.email}                                     
                                    placeholder="Ingrese email"
                                    required 
                                />
                                </Form.Group>

                            <Form.Group as={Col} controlId="formGridTel">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="tel"   
                                    value={formData.tel}                                  
                                    placeholder="Ingrese el Teléfono" 
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAddress1">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="dir"  
                                    value={formData.dir}                                   
                                    placeholder="Ejemplo: Anadon 1234 3ro A"                                    
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPais">
                                <Form.Label>País</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="pais"
                                    value={formData.pais}                                     
                                    placeholder="Ingrese el Pais"                                    
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Provincia</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="prov"   
                                    value={formData.prov}                                  
                                    placeholder="Ingrese Provincia"
                                />
                            </Form.Group>
                            

                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="ciu"  
                                        value={formData.ciu}                                       
                                        placeholder="Ingrese ciudad"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>C.P.</Form.Label>
                                    <Form.Control 
                                        type="number"
                                        name="cp"  
                                        value={formData.cp}                                       
                                        placeholder="Ingrese código postal"
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group id="formGridCheckbox">
                                <Form.Check type="checkbox" label="Activo" name="act" />
                            </Form.Group>

                            <Button variant="light" type="submit">
                                Agregar
                            </Button>
                        </Form> 
                    </Col>
                </Row>
            </Container> 
        </>
    )
}

function initialValueForm(){
    return {
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
        act: "", 
        fc: new Date()
    }
}