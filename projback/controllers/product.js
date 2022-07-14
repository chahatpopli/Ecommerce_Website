import Product from "../models/product.js"
import formidable from "formidable"
import _ from "lodash"
import fs from "fs"

export const getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: "product not found"
            })
        }
        req.product = product;
        next();
    })
}



export const createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtentions = true

    form.parse(req, (err, fields, file) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: "problem with Image"
            })
        }

        //destructure of fields 
        const { name, description, price, category, stock } = fields;
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                err: "please include all fields"
            })
        }

        let product = Product(fields)

        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    err: "Image Size exceed than 3MB"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.filepath)
            product.photo.contentType = file.photo.type
        }


        product.save((err, product) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    err: "Unable to save product in DB"
                })
            }
            res.json({ product })
        })
    })
}

export const getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product);
}

export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        res.send(req.product.photo.data)
    }
    next();
}

export const deleteProduct = (req, res) => {
    const product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                err: "unable to delete user"
            })
        }

        res.json({
            message: "Product deleted successfully"
        })
    })
}

export const updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtentions = true

    form.parse(req, (err, fields, file) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: "problem with Image"
            })
        }


        // Updation code
        let product = req.product;
        product = _.extend(product, fields)

        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    err: "Image Size exceed than 3MB"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.filepath)
            product.photo.contentType = file.photo.type
        }


        product.save((err, product) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    err: "Updation failed in DB"
                })
            }
            res.json({ product })
        })
    })
}

export const getProducts = (req, res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

    Product.find().sort([
        [sortBy, "asc"]
    ]).limit(limit).exec((err, products) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: " No Products are found in DB"
            })
        }
        res.json(products)
    })
}

export const getAllProducts = (req, res) => {


    Product.find().populate("catagory").select("-photo").sort([
        [sortBy, "asc"]
    ]).limit(limit).exec((err, products) => {
        if (err) {
            return res.status(400).json({
                error: "No products found"
            })
        }
        res.json(products)
    })
}

export const getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "NO category found"
            });
        }
        res.json(category);
    });
};

export const updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } }
            }
        };
    });

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation failed"
            });
        }
        next();
    });
};