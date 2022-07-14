import { AppBar, Box, Toolbar, Typography, makeStyles, Button } from '@material-ui/core'
import { Link, Navigate } from "react-router-dom"
import React from 'react'
import { isAuthenticated, signout } from '../auth/helper'
import Logo from "../user/Assets/logo.png"
import Dropdown from "react-bootstrap/Dropdown"


const useStyles = makeStyles({
    component: {
        backgroundColor: "#EDE6DB"
    },
    bar: {
        margin: "4px 4px 4px auto",
        "& > *": {
            color: "#000000",
            textDecoration: "none",
            padding: "10px",
            fontSize: "1rem",
            fontWeight: "bold"
        },
        "& > *:hover": {
            color: "#417D7A",
            fontsize: "2rem"
        }

    },
    typo: {
        color: "#EDE6DB",
        fontSize: "2rem"
    }
})

const Menu = () => {

    const Drop = () => {
        return ( <
            Dropdown >
            <
            Dropdown.Toggle variant = "dark"
            id = "dropdown-basic" >
            Social Media <
            /Dropdown.Toggle>

            <
            Dropdown.Menu >
            <
            Dropdown.Item href = "https://www.instagram.com/deekshant_goyal/" > Instagram < /Dropdown.Item> <
            Dropdown.Item href = "https://twitter.com/iamrealchahat" > Twitter < /Dropdown.Item> <
            Dropdown.Item href = "#/action-3" > About Us < /Dropdown.Item> < /
            Dropdown.Menu > <
            /Dropdown>
        );
    }
    const classname = useStyles();
    return ( <
        Box >
        <
        AppBar className = { classname.component }
        position = "static" >
        <
        Toolbar >
        <
        Typography className = { classname.typo } > < img style = {
            { width: "60px", height: "50px" }
        }
        src = { Logo }
        /> < /
        Typography > < Box > { Drop() } < /Box> < Box className = { classname.bar } >  <
        Link to = "/" > Home < /Link> <
        Link to = "/cart" > Cart < /Link>  {
        isAuthenticated() && isAuthenticated().user.role === 0 && ( <
            Link to = "/user/dashboard" > Dashboard < /Link>
        )
    } {
        isAuthenticated() && isAuthenticated().user.role === 1 && ( <
            Link to = "/admin/dashboard" > A.Dashboard < /Link>
        )
    } {
        !isAuthenticated() && ( <
            >
            <
            Link to = "/signin" > Sign In < /Link> <
            Link to = "/signup" > Sign Up < /Link></ >
        )
    } {
        (isAuthenticated() && ( <
            span style = {
                { cursor: "pointer" }
            }
            onClick = {
                () => {

                    window.location.reload(false);

                    signout();
                }
            } > Sign out < /span>
        ))
    }


    <
    /Box > < /
    Toolbar > <
        /AppBar> < /
    Box >
)
}

export default Menu;