const Category = require('../models/category')

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await Category.findOne(req.body);

    if (category)
      return res.status(500).json({ msg: "This category already exists" });

    const newCategory = new Category(req.body);

    await newCategory.save();
    return res.status(201).json({ msg: "Category created" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


const deleteCategory = async (req, res) => {
    try {        
        await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg: "Category Deleted"})                
    } 
    catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

const updateCategory = async (req, res) => {
    
    try {            
        await Category.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            }, 
            { new: true }
        );

        return res.status(200).json({msg: "Category updated"})                
    } 
    catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

module.exports = {updateCategory, deleteCategory, createCategory, getAllCategories}