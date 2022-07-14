import React from 'react'
import Menu from "./Menu"
import Logo1 from "../user/Assets/logo1.png"

const Base = ({ title = "", description = "", className = " text-dark text-center", children }) => {
    return ( < >
        <
        Menu / > <
        div >
        <
        div className = 'container-fluid' >
        <
        div className = 'jumbotron text-dark text-center' >
        <
        h2 className = 'display-4' > { title } < /h2> <
        p className = 'lead' > {
            description
        } < /p>< /div >
        <
        div className = { className } > {
            children
        } < /div> < /
        div >
        <
        footer className = 'footer mt-auto py-3 '
        style = {
            { backgroundColor: "#417D7A" } } >
        <
        div className = 'container-fluid  text-white text-center py-3'
        style = {
            { backgroundColor: "#EDE6DB" }
        } > < h4 style = {
            { color: "#417D7A" }
        } >
        if you have any query feel free to ask < /h4> <
        button className = 'btn btn-warning btn-lg' > Contact Us < /button>< /div >
        <
        div className = 'container' > < span className = 'text-muted' > An amazing place to buy Tshirt < /span></div > < /footer > < /
        div > < />
    )
}

export default Base