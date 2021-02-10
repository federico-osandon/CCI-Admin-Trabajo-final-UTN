import React from 'react'
import { Link } from 'react-router-dom'
import { MDBRow, MDBCard, MDBCol, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdbreact';
import src1 from '../../assets/unnamed1.png';

function AlumnoItem({alu}) {
    return (
        <>
            <MDBCol lg="4" className="mb-3">
                <MDBCard >
                    <MDBCardImage className="img-fluid" src={src1} />
                    <MDBCardBody>
                        <MDBCardTitle className="text-center mb-2 font-bold">{alu.nom}</MDBCardTitle>
                        <MDBCardTitle sub className="text-center indigo-text mb-2 font-bold">
                            <strong className="mb-2">Area:</strong>{' '}
                            {alu.area}
                        </MDBCardTitle>
                        <MDBCardText>
                            <strong className="mb-2">Email:</strong>{' '}
                            {alu.email}
                        </MDBCardText>
                        <div className="row justify-content-end pr-1">
                            <Link to={`/alumno`} className="btn btn-primary" >Ver...</Link>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </>
    )
}

export default AlumnoItem
