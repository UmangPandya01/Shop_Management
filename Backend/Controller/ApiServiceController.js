const Service = require('../model/service_model')
const chalk = require('chalk')

const error = chalk.red.bold
const success = chalk.inverse.greenBright


//?     Create-new service -- Admin
exports.createService = async (req, res, next) => {

    const newService = Service({
        serviceType: req.body.serviceType,
        serviceName: req.body.serviceName,
        servicePrice: req.body.servicePrice,
        serviceImageUrl: req.body.serviceImageUrl
    })

    try {
        await newService.save()
        res.status(200).send(newService)
        console.log(success('Service added'));
    } catch (e) {
        console.log(error(e));
        res.status(500).send({error: e})
    }
}