const Product = require('../model/product_model')
const chalk = require('chalk')


exports.getProducts = async (req, res) => {
    
    try {
        
        const catProducts = await Product.find({ productCat: req.query.category })
        
        if (catProducts) {
            console.log(chalk.inverse(catProducts));
            res.status(200).send(catProducts)

        } else {
            console.log(chalk.red.inverse('Could not found any products of ', req.query.category));
            res.status(400).send({error: 'Could not found any products '})
        }
        
    } catch (error) {
        console.log(chalk.red.inverse(error));
        res.status(500).send({error: error})
    }
}

exports.getOneProduct = async (req, res) => {

    try {
        
        // console.log(req.params.id);
        const product = await Product.findById(req.params.id)

        if (!product) {
            console.log(chalk.red.inverse('Product not found'));
            res.status(400).send('Product not found')
        }
        else {
            console.log(chalk.inverse(product));
            res.status(200).send(product)
        }

    } catch (error) {
        console.log(chalk.red.inverse(error));
        res.status(500).send({error: error}) 
    }
}

exports.addProduct = async (req, res) => {

    try {
        
        const newProduct = new Product({
            productCat: req.body.productCat,
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productImage: req.body.productImage,
            productDesc: req.body.productDesc,
            productBrand: req.body.productBrand
        })
        
        console.log(chalk.inverse(newProduct));
        await newProduct.save()
        res.status(200).send((newProduct).toString())

    } catch (error) {
        console.log(chalk.red.inverse(error));
        res.status(500).send({error: error})
    }
}

exports.getAllProducts = async(req, res) => {

    try {
        
        const products = await Product.find()
        res.status(200).send(products)
        
    } catch (error) {
        console.log(chalk.red.inverse(error));
        res.status(500).send({error: error})
    }
}