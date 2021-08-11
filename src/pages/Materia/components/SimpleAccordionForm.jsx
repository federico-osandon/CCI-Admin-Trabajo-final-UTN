import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from "../MateriaPageStyled";



const SimpleAccordionForm = ({NombreBotonDesplegable, children}) => {
    const classes = useStyles();
    console.log('renderizar acordion')
    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>{NombreBotonDesplegable}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AccordionActions>
                        { children }
                    </AccordionActions>
                </AccordionDetails>
            </Accordion>           
        </div>
    );
}
export default SimpleAccordionForm