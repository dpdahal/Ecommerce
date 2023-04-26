import Product from "../models/Product.js";

class ProductController {

    async index(req, res) {
        res.send('index');
    }

    async store(req, res) {
        let images = [];
        if (req.files) {
            req.files.forEach(file => {
                images.push(file.filename);
            });
        }
        await Product.create({...req.body, images: images});
        res.status(200).json({success: 'Product created successfully'});

    }

    async show(req, res) {
        res.send('read');
    }

    async update(req, res) {
        res.send('update');
    }

    async destroy(req, res) {
        res.send('delete');
    }
}

export default ProductController;