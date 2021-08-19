const chalk = require('chalk')
const Cart = require('../model/cart_model')


exports.getCartProducts = async (req, res) => {

    try {
        
        await req.client.populate({
            path: 'cartProducts',
            model: 'Cart',
        }).execPopulate()

        console.log(chalk.inverse(req.client.cartProducts));
        res.status(200).send(req.client.cartProducts)

    } catch (error) {
        console.log(chalk.red.inverse(error));
        res.status(500).send({error:error})
    }
}

exports.removeFromCart = async (req, res) => {

    try {

        const cartProduct = await Cart.findOne({ clientID: req.client._id })
        
        // console.log(chalk.inverse(cartProduct.products));
        cartProduct.products = cartProduct.products.filter(function (product) {
             return cartProduct.products.indexOf(product) != req.query.index
        })
        
        await cartProduct.save()
        console.log(chalk.inverse(cartProduct));
        res.status(200).send(cartProduct)
        
    } catch (error) {
        console.log(chalk.red.inverse(error));
        res.status(500).send({error: error})      
    }
}

exports.addToCart = async (req, res) => {

    try {
        
        const cart = await Cart.findOne({
            clientID: req.client._id
        })
        
        if (!cart) {
            const cartProduct = new Cart({
                clientID: req.client._id,
                products: req.params.id,
            })
            await cartProduct.save()
            res.status(200).send(cartProduct)
            console.log(chalk.inverse(cartProduct));
        }
        else {

            cart.products.push(
                 req.params.id
            );
            await cart.save();
            console.log(chalk.inverse(cart));
            res.status(200).send(cart)
        }

    } catch (error) {
        console.log(chalk.red.inverse(error));
        res.status(500).send({error: error})
    }
}