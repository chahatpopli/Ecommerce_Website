import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Navigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";


const Card = ({ product, addToCart = true, removeFromCart = false, reload = undefined, setReload = function(f) { return f } }) => {

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
                className = "btn btn-block btn-outline-success mt-2 mb-2" >
                Add to Cart <
                /button>
            )
        )
    }
    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && ( <
                button onClick = {
                    () => {
                        removeItemFromCart(product._id);
                        setReload(!reload)
                    }
                }
                className = "btn btn-block btn-outline-danger mt-2 mb-2" >
                Remove from cart <
                /button>
            )
        )
    }

    return ( <
        div className = "card bg-white text-dark m-auto shadow-lg p-3 mb-5 bg-white rounded"
        style = {
            { maxWidth: "540px" }
        } >
        <
        div className = "row no-gutters" >
        <
        div className = "col-md-6" >
        <
        ImageHelper product = { product }
        />  < /
        div > <
        div className = "col-md-6" >
        <
        div className = "card-body" >
        <
        h5 className = "card-title" > { cartTitle } < /h5> <
        p className = "card-text" > { cartDesc } < /p> <
        p className = "card-text" > < span class = "badge badge-warning text-dark" > $ { cartPrice } < /span>< /p > <
        div className = "row" >
        <
        div className = "col-12" > { showAddToCart(addToCart) } <
        /div> <
        div className = "col-12" > { showRemoveFromCart(removeFromCart) } <
        /
        div > <
        /div></div >
        <
        /div> < /
        div > <
        /div> 
    );
};

export default Card;