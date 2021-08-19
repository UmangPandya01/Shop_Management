const Barber = require('../model/barber_model')
const chalk = require('chalk')

exports.addbarber = async (req, res, next) => {
    
    try {
        
        const barber = new Barber({
            name: req.body.name,
            number: req.body.number
        })

        await barber.save()
        console.log(chalk.inverse(barber));
        res.status(200).send(barber)

    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send({error: error})
    }
}