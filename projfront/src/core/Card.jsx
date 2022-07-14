import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Navigate } from "react-router-dom";
import { addItemToCart } from "./helper/cartHelper";


const Card = ({ product, addToCart = true, removeFromCart = false }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cartTitle = product ? product.name : "Default Name";
    const cartDesc = product ? product.description : "Default Description";
    const cartPrice = product ? product.price : "Default PRICE";

    const addToTheCart = () => {
        addItemToCart(product, () => setRedirect(true));
    };

    const getARedirect = redirect => {
        if (redirect) {
            return <Navigate to = "/cart" / > ;
        }
    };

    const showAddToCart = (addToCart) => {
        return (
            addToCart && ( <
                button onClick = {
                    addToTheCart
                }
                className = "btn btn-lg btn-block text-white "
                type = "button"
                style = {
                    { backgroundColor: "#417D7A" }
                } >
                Add to Cart <
                /button>
            )
        )
    }
    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && ( <
                button onClick = {
                    () => {}
                }
                className = "btn btn-block btn-outline-danger " >
                Remove from cart <
                /button>
            )
        )
    }




    return ( <
        div className = "card text-white shadow-lg p-3 mb-5 bg-white rounded "
        style = {
            { backgroundColor: "#EDE6DB" }
        } >
        <
        div className = "card-body justify-content-left" > { getARedirect(redirect) }

        <
        ImageHelper product = { product }
        />  <
        div className = "card-title text-dark font-weight-bold" > < strong > { cartTitle } < /strong>  < /div > <
        p className = "card-text font-weight-normal text-dark text-wrap" > { cartDesc } <
        /p> <
        p className = "badge text-dark"
        style = {
            { backgroundColor: "#EDE6DB" }
        } > $ { cartPrice } < /p> <
        div className = "row" >
        <
        div className = "col-12" > { showAddToCart(addToCart) } <
        /div> <
        div className = "col-12" > { showRemoveFromCart(removeFromCart) } <
        /
        div > <
        /div> < /
        div > <
        /div>
    );
};

export default Card;