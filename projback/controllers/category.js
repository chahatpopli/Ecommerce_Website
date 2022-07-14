import Category from "../models/catagory.js"


export const getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if (err || !cate) {
            console.log(err)
            return res.status(400).json({
                err: "Category not found"
            })
        }
        req.category = cate;
        next();
    })
}

export const createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: "not able to save user"
            })
        }
        res.json({ category })
    })
}

export const getCategory = (req, res) => {
    return res.json(req.category);
}

export const getAllCategories = (req, res) => {
    Category.find().exec((err, items) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                err: " No Categories are found in DB"
            })
        }
        res.json(items)
    })
}



export const updateCategory = (req, res) => {
    try {
        const categoryUpdation = req.c;
        if (!req.Category) return res.send("No category found!")
        categoryUpdation.name = req.body.name;

        category.save((err, updatedCategory) => {
            if (err || !updatedCategory) {
                return res.status(400).json({
                    error: "Failed to update category"
                });
            }
            res.json(updatedCategory);
        });
    } catch (err) {
        console.log(err)
    }
};

export const deleteCategory = (req, res) => {
    const category = req.category;

    category.remove((err, deletedcategory) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete this category"
            });
        }
        res.json({
            message: "Successfull deleted"
        });
    });
};