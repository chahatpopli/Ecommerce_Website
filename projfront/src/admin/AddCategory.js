import React, { useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from "../core/Base"
import { Box, FormControl, FormGroup, TextField, Button, makeStyles } from "@material-ui/core"
import { createCategory } from "./helper/adminapicall"
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    boxcomponent: {
        marginBottom: "8%"
    },
    container: {
        width: "50%",
        margin: "5% 0 0 25%",
        "& > *": {
            marginTop: "40px"
        }
    },
    button: {
        backgroundColor: "#0DCAF0"
    }
})

const AddCategory = () => {
    const classname = useStyles();
    const [name, setName] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const { user, token } = isAuthenticated();

    const handleChange = (event) => {
        setError("");
        setName(event.target.value)
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)

        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError("")
                    setSuccess(true)
                    setName("")
                }
            })

    }
    const SuccessMessage = () => {
        return (
            success && ( <
                div className = "alert alert-success mt-4" >
                <
                h2 className = 'text-dark text-center' > Category Added successfully < /h2> < /
                div >
            )
        );
    };

    const goBack = () => {
        return ( <
            Link to = "/admin/dashboard"
            className = 'btn btn-outline-success' > Back < /Link>
        );
    };



    const AddCategoryForm = () => {
        return ( <
            Box className = { classname.boxcomponent } >
            <
            FormGroup className = { classname.container } >
            <
            FormControl >
            <
            TextField id = "outlined-basic"
            label = "Category"
            variant = "filled"
            onChange = { handleChange }
            value = { name }
            / > < /
            FormControl > <
            Button variant = 'contained'
            color = "primary"
            onClick = { onSubmit } > Add < /Button > < /
            FormGroup >

            <
            /Box>
        );
    }

    return ( <
        >
        <
        Base title = "Add Category"
        description = "Add a new Category here"
        className = "container bg-info p-4" >
        <
        div className = 'row bg-white rounded' >
        <
        div className = 'col-md-8 offset-md-2' > { goBack() } { SuccessMessage() } { AddCategoryForm() } <
        /div> < /
        div > <
        /Base>

        <
        />
    )
}

export default AddCategory