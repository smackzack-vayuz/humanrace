import Category from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler'
import category from '../data/category.js'

// @desc update category image
// route POST category/upload
// access Public
const uploadCat = asyncHandler(async (req, res) => {
    res.json({ image: `/${req.file.path}` })
})

// @desc Get all category
// route POST category
// access Public
const getCategory = asyncHandler(async(req,res)=>{
    const category = await Category.find({})
    res.send(category)
})
export { uploadCat,getCategory }