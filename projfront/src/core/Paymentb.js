import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { getmeToken, processPayment } from "./helper/paymentbHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import StripeCheckout from "react-stripe-checkout"
import { API } from "../backend";

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
        const [info, setInfo] = useState({
            loading: false,
            success: false,
            clientToken: null,
            error: "",
            instance: {}
        });

        const userId = isAuthenticated() && isAuthenticated().user._id;
        const token = isAuthenticated() && isAuthenticated().token;

        const tempAmount = () => {
            let amount = 0;
            products.map(p => {
                amount = amount + p.price;
            });
            return amount;
        }

        const taxGenerate = () => {
            let tax = 0;
            let amount = tempAmount();
            products.map(p => {
                let pp = (5 * amount) / 100
                tax = pp;
            });
            return tax;
        }

        const PriceDisplay = () => {
            return ( <
                div className = "card text-dark m-auto shadow-lg p-3 mb-5 bg-white rounded"
                style = {
                    { maxWidth: "540px" }
                } >
                <
                div >
                <
                table className = "table text-dark text-left" >
                <
                tr style = {
                    { margin: "20px" }
                } >
                <
                td > Items Total < /td> <
                td > $ { tempAmount() } < /td> < /
                tr > <
                tr style = {
                    { margin: "20px" }
                } >
                <
                td > Tax(5 % ) on total < /td> <
                td > $ { taxGenerate() } < /td> < /
                tr > <
                tr style = {
                    { margin: "20px" }
                } >
                <
                td > < h3 > Total amount to pay < /h3></td >
                <
                td > $ { getAmount() } < /td> < /
                tr > <
                /table> < /
                div > <
                /div> 
            );
        }

        const getAmount = () => {
            let tax = taxGenerate();
            let amount = tempAmount()
            let final = tax + amount
            return final;
        };

        const makePayment = token => {
            const body = {
                token,
                products
            };
            const headers = {
                "Content-Type": "application/json"
            };
            return fetch(`${API}/stripepayment`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body)
                })
                .then(response => {
                    console.log(response);
                    //call further methods
                })
                .catch(error => console.log(error));
        }



        const BuyProduct = () => {
            return ( <
                StripeCheckout stripeKey = "pk_test_51Kw8D5SIjIGkAyYetp1Wpv6UkRc7cG8TBlWe33etbdAW8uPgkOLfz6bY6LSDHxOFWNmUzUmmPxCvsRc5tE8Df17N00oXD2Ghn1"
                token = { makePayment() * 100 }
                amount = { getAmount() }
                name = "Buy T-Shirts"
                shippingAddress billingAddress > <
                button className = "btn btn-success" > Pay using Stripe < /button></StripeCheckout >
            );
        }



        return ( <
                div >
                <
                div > { PriceDisplay() } {
                    isAuthenticated() && products.length > 0 ? BuyProduct() : ( < h3 > Either your cart is empty or You need to Sign in < /h3>) } < /
                        div > < /
                        div >
                    );
                };

                export default Paymentb;