const chalk = require('chalk')
const Order = require('../model/order_model')

exports.placeOrder = async (req, res) => {

    try {
        
        const order = await Order.findOne({
            clientID: req.client._id,
        })
        
        const orderDetails = {
            productID: req.params.id,
            clientName: req.client.name,
            quantity: req.body.quantity,
            total: req.body.total,
            dateTime: req.body.dateTime,
            mobileNo: req.body.number,
            address: req.body.address,
            pincode: req.body.pincode,
            isDelivered: false
        }

        //* it means user's first order
        if (!order) {
            const newOrder = new Order({
                clientID: req.client._id,
                orders: orderDetails
            })
            await newOrder.save()
            console.log(chalk.inverse(newOrder));
            res.status(200).send(newOrder)

        } else {
            
            order.orders.push(orderDetails)
            await order.save()
            console.log(chalk.inverse(order));
            res.status(200).send(order)
        }

    } catch (error) {
        console.log(chalk.red.inverse(error));
        res.status(500).send({error: error})
    }
}

exports.getOrders = async (req, res) => {
    
    try {
        
        await req.client.populate({
            path: 'orderProducts',
            model: 'Order',
        }).execPopulate()

        console.log(chalk.inverse(req.client.orderProducts));
        res.status(200).send(req.client.orderProducts)

    } catch (error) {
        console.log(chalk.red.inverse(error));
        res.status(500).send({error: error})
    }
}