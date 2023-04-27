import Product from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config();

class ProductController {

    async index(req, res) {
        let allProducts = await Product.find({}).populate('categoryId');
        allProducts = allProducts.map(product => {
            if (product.images.length > 0) {
                product.images = product.images.map(image => {
                    return `${process.env.BASE_URL}/uploads/products/${image}`;
                });
                return product;
            } else {
                product.images = [`${process.env.BASE_URL}/uploads/icons/not-found.png`];
                return product;
            }
        });
        console.log(allProducts);
        res.status(200).json(allProducts);
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
        let id = req.params.id;
        let product = await Product.findById(id).populate('categoryId');
        if (product.images.length > 0) {
            product.images = product.images.map(image => {
                return `${process.env.BASE_URL}/uploads/products/${image}`;
            });
        } else {
            product.images = [`${process.env.BASE_URL}/uploads/icons/not-found.png`];
        }
        res.status(200).json(product);
    }

    async update(req, res) {
        res.send('update');
    }

    async destroy(req, res) {
        res.send('delete');
    }
}

export default ProductController;