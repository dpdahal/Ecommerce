import Category from "../models/Category.js";

class CategoryController {

    async index(req, res) {
        const categories = await Category.find().sort({_id: -1});
        return res.json(categories);
    }

    async store(req, res) {
        await Category.create(req.body);
        return res.json({success: "Category created"});
    }

    async show(req, res) {
        const category = await Category.findById(req.params.id);
        return res.json(category);
    }

    async update(req, res) {
        let category = await Category.findById(req.params.id);
        category.name = req.body.name;
        category.slug = req.body.slug;
        category.save();
        return res.json(category);
    }

    async destroy(req, res) {
        await Category.findByIdAndDelete(req.params.id);
        return res.json({message: "Category deleted"});
    }

}

export default CategoryController;