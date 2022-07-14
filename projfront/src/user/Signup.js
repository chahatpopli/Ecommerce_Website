import { Box, Button, TextField, FormControl, InputLabel, FormGroup, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { signup } from '../auth/helper';
import Base from "../core/Base";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    boxcomponent: {
        marginBottom: "8%"
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

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        phonenumber: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, phonenumber, password, error, success } = values;
    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false })
        signup({ name, email, phonenumber, password })
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        phonenumber: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch()
    }

    const classname = useStyles();

    const SignupForm = () => {
        return (
          <>
            <Box className = { classname.boxcomponent } >
              <FormGroup className = { classname.container } >
                <FormControl >
                  <TextField id = "outlined-basic" label = "First Name" variant = "filled" onChange = { handleChange("name") } value = { name } / >
                </FormControl>
                <FormControl>
                  <TextField id = "outlined-basic" label = "Email" variant = "filled" onChange = { handleChange("email") } value = { email } / >
                </FormControl>
                <FormControl>
                  <TextField id = "outlined-basic" label = "Phone Number" variant = "filled" onChange = { handleChange("phonenumber") } value = { phonenumber } / >
                </FormControl>
                <FormControl>
                  <TextField id = "outlined-basic" label = "Password" variant = "filled" onChange = { handleChange("password") } value = { password } / >
                </FormControl>
                <Button variant = 'contained' color = "primary" onClick = { onSubmit } > Submit < /Button >
              </FormGroup>
            </Box>
          </>
        );
    }

    const successMessage = () => {
        return (
          <div className = "row" >
            <div className = "col-md-6 offset-sm-3 text-left" >
              <div className = "alert alert-success" style = { { display: success ? "" : "none" } } >
                New account was created successfully.Please <Link to = "/signin" > Login Here < /Link>
              </div>
            </div>
          </div>
        );
    };

    const errorMessage = () => {
        return (
          <div className = "row">
            <div className = "col-md-6 offset-sm-3 text-left">
              <div className = "alert alert-danger" style = { { display: error ? "" : "none" } } > { error } </div>
            </div>
          </div>
        );
    };
    return (
      <Base title = "Sign Up" description = "Create Your Account" >
        { successMessage() } { errorMessage() } { SignupForm() }
        < p className = 'text-black text-center' > { JSON.stringify(values) } < /p>
      </Base>
    );
}

export default Signup;
