import React, {useState} from "react";
import { makeStyles, Typography, Button, TextField } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert'
import { getAuth } from '../../../firebase/firebaseConfig.js'

const useStyles = makeStyles(theme => ({
  root: {
    background: "#0d131d",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  },
  mBottom: {
    marginBottom: ".5rem"
  },
  button: {
    marginTop: ".85rem"
  },
  loginCard: {
    width: "275px",
    borderRadius: 5,
    background: "#fff",
    padding: ".85rem"
  }
}));

const LoginPage = props => {
    const [formData, setFormData] = useState(initialSateFormData)
    const [ messageError, setMessgaeError ] = useState({
        msg: ''
    })
    
    const classes = useStyles();
    const { history } = props;

    const handlerOnChange= (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })       
    }
    
    const db = getAuth()
    const { email, password } = formData
     
    const handlerOnSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()         
        // db.createUserWithEmailAndPassword(email, password)
        //     .then(resp => console.log(resp))
            
        if (         
            email !== '' &&
            password.length >= 6 &&
            password !== ''                              
        ){            
            db.signInWithEmailAndPassword(email, password)
            .then(async resp => {  
                await console.log(resp)              
                history.push("/")
            })
            .catch(err => {               
                console.error(err)
                setMessgaeError({msg: err.message})
            })
        }else{
            console.log('debe estar completo y bien llenos todos los campos');
            setMessgaeError({msg: "Debe estar completo y bien llenos todos los campos"})
        }       
    }

    return (
        <div className={classes.root}>
            {messageError.msg.length !== 0 && 
                <Alert style={{marginBottom: '15px'}} severity="error">
                    {messageError.msg}
                </Alert>
            }
            <div className={classes.loginCard}>
            <Typography variant="h5" component="h1">
                Login
            </Typography>
            {/* <Typography className={classes.brand} variant="h5" component="h1">
                Login
            </Typography> */}
            <Typography className={classes.mBottom} variant="body1">
                Sign In to your account
            </Typography>

            <form noValidate autoComplete="off" onChange={handlerOnChange} onSubmit={handlerOnSubmit}>
                <TextField
                name="email"
                size="small"
                label="Email"
                variant="outlined"
                margin="dense"
                fullWidth
                />
                <TextField
                name="password"
                size="small"
                label="Password"
                type="password"
                variant="outlined"
                margin="dense"
                fullWidth
                />
                <Button
                    //onClick={() => history.push("/pages/auth/forgot-password")}
                    color="primary"
                >
                    Forgot password?
                </Button>
                <div className={classes.mBottom}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    //onClick={() => history.push("/")}                
                >
                    Login
                </Button>
                {/* <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    className={classes.button}
                    onClick={() => history.push("/pages/auth/register")}
                >
                    Register Now!
                </Button> */}
                </div>
            </form>
            <Typography variant="caption">&copy; CCI | React Admin</Typography>
            </div>
            {/* <Typography variant="h3" gutterBottom>
            Oops! <span className={classes.statusCode}>404</span>
            </Typography>
            <Typography variant="body1">
            The page you are looking for was not found.
            </Typography>
            <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => history.push("/")}
            >
            Back to Home
            </Button> */}
        </div>
    );
};

const initialSateFormData= {
    email: "",
    password: ""
}

export default LoginPage;
