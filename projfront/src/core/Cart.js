import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import CartCard from "./CartCard";
import { loadCart } from "./helper/cartHelper";
import Paymentb from "./Paymentb"

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = (products) => {
        return ( <
                div >
                <
                h2 > This section is to load products < /h2> {
                products.map((product, index) => ( <
                    CartCard key = { index }
                    product = { product }
                    removeFromCart = { true }
                    addToCart = { false }
                    reload = { reload }
                    setReload = { setReload }
                    />
                ))
            } <
            /div>
    );
};
const loadCheckout = () => {
    return ( <
        div >
        <
        Paymentb products = { products }
        setReload = { setReload }
        / > < /
        div >
    );
};

return ( <
        Base title = "Cart Page"
        description = "Ready to checkout" >
        <
        div className = "row text-center" >
        <
        div className = "col-6" > {
            products.length > 0 ? loadAllProducts(products) : ( < h3 > No Products in the Cart < /h3>) } < /div > <
                div className = "col-6" > { loadCheckout() } < /div> < /
                div > <
                /Base>
            );
        };

        export default Cart;