import React, { useState, useEffect } from 'react'
import Base from "../core/Base"
import { makeStyles } from '@material-ui/core'
import Card from "./Card"
import { getProducts } from "./helper/coreapicalls";
import BACK from "../user/Assets/back1.jpg"
import BACK1 from "../user/Assets/back2.jpg"
import BACK2 from "../user/Assets/back3.jpg"
import Carousel from "react-bootstrap/Carousel"
import ReactLoading from "react-loading";
import LOGO from "../user/Assets/logo1.png"


const useStyles = makeStyles({
    back: {
        height: "10vh",
        background: "linear-gradient(-90deg,#00BC40,#4C3AE3)",
        color: "#FFFFFF",
        fontSize: "3rem",
        padding: "1vh",
        textAlign: "left",
        margin: 0
    },
    image: {
        padding: 0
    },
    carousel: {
        width: "900px",
        height: "100px",
        margin: "auto",
    }
})

const Home = () => {
        const [products, setProducts] = useState([]);
        const [error, setError] = useState(false);
        const [load, setload] = useState(false);

        const loadAllProduct = () => {
            getProducts().then(data => {
                console.log(data)
                if (data.error) {
                    setError(data.error);
                } else {
                    setProducts(data);
                    setload(true);
                }
            });
        };

        useEffect(() => {
            loadAllProduct();
        }, []);

        const Carosol = () => {
            return ( <
                Carousel >
                <
                Carousel.Item >
                <
                img className = "d-block w-100"
                src = { BACK2 }
                alt = "First slide"
                width = { "100%" }
                height = { 400 }
                / > <
                Carousel.Caption >
                <
                h3 > First slide label < /h3> <
                p > Menswear Founded on Fit, Built on Service, and Focused on Style.However You Fit, C & D Fits You < /p> < /
                Carousel.Caption > <
                /Carousel.Item> <
                Carousel.Item >
                <
                img className = "d-block w-100"
                src = { BACK }
                alt = "Second slide"
                width = { "100%" }
                height = { 400 }
                / >

                <
                Carousel.Caption >
                <
                h3 > Second slide label < /h3> <
                p > Combining quality and reliability in one < /p> < /
                Carousel.Caption > <
                /Carousel.Item> <
                Carousel.Item >
                <
                img className = "d-block w-100"
                src = { BACK1 }
                alt = "Third slide"
                width = { "100%" }
                height = { 400 }
                / >

                <
                Carousel.Caption >
                <
                h3 > Third slide label < /h3> <
                p > The World < /p> < /
                Carousel.Caption > <
                /Carousel.Item> < /
                Carousel >

            );

        }

        const display = () => {
            return ( <
                >
                <
                div > { Carosol() } < /div> <
                div className = 'row' > <
                h1 className = "text-dark" > All of Tshirts < /h1> <
                div className = "row" > {
                    products.map((product, index) => {
                        return ( <
                            div key = { index }
                            className = "col-lg-3 col-sm-6 mb-4" >
                            <
                            Card product = { product }
                            / > < /
                            div >
                        );
                    })
                } <
                /div> < /
                div > <
                />

            )
        }

        const loading = () => {
            return ( <
                div >
                <
                img style = {
                    { width: "10%", height: "10%" }
                }
                src = { LOGO }
                /> <
                ReactLoading type = "spinningBubbles"
                color = "#417D7A"
                height = { 500 }
                width = { 50 }
                /> < /
                div >
            );
        }

        const classname = useStyles();
        return ( < Base > { load ? display() : loading() } <
            /Base>);
        }

        export default Home;