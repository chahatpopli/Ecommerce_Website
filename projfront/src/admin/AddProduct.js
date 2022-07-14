import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { getCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";


const AddProduct = () => {

    const { user, token } = isAuthenticated()
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        didRedirect: false,
        formData: "",
        success: false
    });

    const { name, description, price, stock, photo, categories, category, loading, error, createdProduct, didRedirect, formData, success } = values;


    const preload = () => {
        getCategories().then(data => {
            console.log(data);
            if (data.error) {
                setValues({...values, error: data.error });
            } else {
                setValues({...values, categories: data, formData: new FormData });
                console.log(categories);
            }
        })
    }

    useEffect(() => {
        preload();
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true, success: true, });
        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    photo: "",
                    stock: "",
                    success: false,
                    loading: false,
                    createdProduct: data.name
                });
            }
        });

    };

    const successMessage = () => ( <
        div className = "alert alert-success mt-3"
        style = {
            { display: success ? "" : "none" }
        } >
        <
        h4 > Product created successfully < /h4> < /
        div >

    );


    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value });

    };

    const createProductForm = () => ( <
        form >
        <
        span > Post photo < /span> <
        div className = "form-group"
        style = {
            { margin: "20px" }
        } >
        <
        label className = "btn btn-block btn-success" >
        <
        input onChange = { handleChange("photo") }
        type = "file"
        name = "photo"
        accept = "image"
        placeholder = "Select file"
        required /
        >
        <
        /label> < /
        div > <
        div className = "form-group"
        style = {
            { margin: "20px" }
        } >
        <
        input onChange = { handleChange("name") }
        name = "photo"
        className = "form-control"
        placeholder = "Name"
        required value = { name }
        /> < /
        div > <
        div className = "form-group"
        style = {
            { margin: "20px" }
        } >
        <
        textarea onChange = { handleChange("description") }
        name = "photo"
        className = "form-control"
        placeholder = "Description"
        required value = { description }
        /> < /
        div > <
        div className = "form-group"
        style = {
            { margin: "20px" }
        } >
        <
        input onChange = { handleChange("price") }
        type = "number"
        className = "form-control"
        placeholder = "Price"
        required value = { price }
        /> < /
        div > <
        div className = "form-group"
        style = {
            { margin: "20px" }
        } >
        <
        select onChange = { handleChange("category") }
        className = "form-control"
        placeholder = "Category"
        required >
        <
        option > Select < /option> {
        categories && categories.map((cate, index) => ( <
            option key = { index }
            value = { cate._id } > { cate.name } < /option>
        ))
    } < /
    select > <
        /div> <
    div className = "form-group"
    style = {
            { margin: "20px" }
        } >
        <
        input onChange = { handleChange("stock") }
    type = "number"
    className = "form-control"
    placeholder = "Quantity"
    required
    value = { stock }
    /> < /
    div >
        <
        Button variant = 'contained'
    color = "primary"
    onClick = { onSubmit }
    style = {
        { margin: "20px" }
    } > Add Product < /Button >  < /
    form >
);

return ( <
    Base title = "Add a product here!"
    description = "Welcome to product creation section"
    className = "container bg-info p-4" >
    <
    Link to = "/admin/dashboard"
    className = "btn btn-md btn-light mb-3" >
    Admin Home <
    /Link> <
    div className = "row bg-light text-dark rounded" >
    <
    div className = "col-md-8 offset-md-2" > { successMessage() } { createProductForm() } < /div> < /
    div > <
    /Base>
);
};



export default AddProduct;