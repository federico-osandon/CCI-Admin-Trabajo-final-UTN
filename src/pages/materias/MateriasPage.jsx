import { Paper } from '@material-ui/core'
import React, {useContext} from 'react'
import OftadehBreadcrumbs from '../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import OftadehLayout from '../../components/OftadehLayout/OftadehLayout'
import AuthContext from '../../context/ Authentication/authContext'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './MaterialPage.css'
import FormMateria from './components/FormMateria'
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginBottom: '10px'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
}));

const columns = [
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "author",
      label: "Author",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "categories",
      label: "Categories",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "tags",
      label: "Tags",
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true
      }
    }
  ];
  
  const data = [
    {
      title: "Learn Javascript",
      author: "Mohammad Oftadeh",
      categories: "javascript",
      tags: "web, javascript",
      date: "12-12-2020"
    },
    {
      title: "React.js with Material UI",
      author: "John Doe",
      categories: "react, material-ui",
      tags: "react, material ui",
      date: "12-12-2020"
    }
  ];
  
  const options = {
    filterType: "checkbox"
  };

const SimpleAccordionForm = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Agregar Materia</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AccordionActions>
                        <FormMateria />
                    </AccordionActions>
                </AccordionDetails>
            </Accordion>           
        </div>
    );
}

function MateriasPage(props) {
    const { history } = props

    const { usuario } = useContext(AuthContext)
    if (!usuario) {
        history.push('/pages/auth/login')
      }

    return (
        <>
            <OftadehLayout>
                <h1>Materias</h1>
                <OftadehBreadcrumbs path={history} />
                <Paper style={{ padding: "5px" }}>
                <SimpleAccordionForm /> 
                </Paper>
                <MUIDataTable
                        title={"Posts List"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
            </OftadehLayout>
        </>
    )
}

export default MateriasPage
