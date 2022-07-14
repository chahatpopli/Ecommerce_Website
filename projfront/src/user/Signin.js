import { Box, Button, TextField, FormControl, InputLabel, FormGroup, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import Base from "../core/Base"
import { signin, isAuthenticated, authenticate } from "../auth/helper"
import { Redirect, Navigate, Link } from "react-router-dom"
import Logo1 from "../user/Assets/logo1.png"


const useStyles = makeStyles({
    boxcomponent: {
        marginBottom: "1%"
    },
    container: {
        width: "50%",
        margin: "5% 0 0 25%",
        "& > *": {
            marginTop: "20px"
        }
    },
    button: {
        backgroundColor: "#0DCAF0"
    }
});

const Signin = () => {

    const [values, setValues] = useState({
        email: "ashishpopli2001@gmail.com",
        password: "123456789",
        error: "",
        loading: false,
        didRedirect: false,

    })

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();
    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false });
                    console.log(data.error)
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        });
                    });
                }
            })
            .catch(console.log("signin request failed"));
    };

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Navigate to = "/admin/dashboard" / > ;
            } else {
                return <Navigate to = "/user/dashboard" / > ;
            }
        }
        if (isAuthenticated()) {
            return <Navigate to = "/" / > ;
        }
    };

    const loadingMessage = () => {
        return (
            loading && (
              <div className = "alert alert-info" >
                <h2 > Loading... </h2>
              </div >
            )
        );
    };


    const errorMessage = () => {
        return (
          <div className = "row" >
            <div className = "col-md-6 offset-sm-3 text-left" >
              <div className = "alert alert-danger" style = { { display: error ? "" : "none" } } > { error } < /div>
            </div >
          </div>
        );
    };

    const classname = useStyles();

    const SigninForm = () => {
        return (
          <>
            <Box className = { classname.boxcomponent } >
              <FormGroup className = { classname.container } >
                <FormControl >
                  <TextField id = "outlined-basic" label = "Email" variant = "filled" onChange = { handleChange("email") } value = { email } / >
                </FormControl >
                <FormControl >
                  <TextField id = "outlined-basic" label = "Password" variant = "filled" onChange = { handleChange("password") } value = { password } / >
                </FormControl >
                <Button variant = 'contained' color = "primary" onClick = { onSubmit } > Submit < /Button >
              </FormGroup >
            </Box>
          </>
        );
    }

    return (
      <Base title = "Welcome Back" >
         <img style = { { width: "160px", height: "150px" } } src = { Logo1 }/>
         { loadingMessage() } { errorMessage() } { SigninForm() } { performRedirect() }
         <p> { JSON.stringify(values) } < /p>
      </Base >
    );
}

export default Signin;
