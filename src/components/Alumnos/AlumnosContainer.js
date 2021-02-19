import React, { useState, useEffect } from 'react'
import  Accordion from 'react-bootstrap/Accordion'
import  Button from 'react-bootstrap/Button'
import  { useAccordionToggle } from 'react-bootstrap'
import  Card from 'react-bootstrap/Card'
import AlumnosList from './AlumnosList'
import { getFirestore } from '../../utils/firebaseApp'
import TopNavigation from '../TopNavigation'
import { AlumnosForm } from './AlumnosForm'


function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log('totally custom!'),
    );
  
    return (
            <button  
                className="btn btn-light"                  
                type="button"
                //style={{ backgroundColor: 'transparent'}}
                onClick={decoratedOnClick}
            >
                {children}
            </button>           
    );
}

function AcordionAlumnoForm({actListAlum, listAlum}) {
    
    return (
        <>
            <Accordion defaultActiveKey="0" className="mb-5">
                <Card >
                    <Card.Header >
                        <CustomToggle  eventKey="1">
                            Agregar Alumno
                        </CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <AlumnosForm actListAlum={actListAlum} listAlum={listAlum} /> 
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>           
            </Accordion>          
      </>
    );
  }


function AlumnosContainer() {
    const [alumnos, setAlumnos] = useState([])
    const [actualizarListadoAlumnos, setActualizarListadoAlumnos] = useState(false)
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
        

        const db = getFirestore()
        const alumnos = db.collection('alumnos').where("act", "==", "on").get()
        // if (alumnosQuery.exist){
            //     console.log();
            // }
        // console.log(alumnos.exists);
        
        alumnos.then(resp => {            
            setAlumnos(resp.docs.map(alu => ( {...alu.data(), id: alu.id} )))
            setLoading(true)            
        })        
    }, [actualizarListadoAlumnos])

    console.log(alumnos);    
    return (
        <>
            <TopNavigation />
            <main id="content" className="p-5">
                <AcordionAlumnoForm actListAlum={setActualizarListadoAlumnos} listAlum={actualizarListadoAlumnos} />                
                {loading ? <AlumnosList alum={alumnos} /> : <h2>Cargando...</h2> }
                               
            </main>
        </>
    )
}

export default AlumnosContainer
