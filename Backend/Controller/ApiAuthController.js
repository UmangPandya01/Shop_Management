const jwt = require('jsonwebtoken')
const chalk = require('chalk')
const Client  = require('../model/client_model')

const auth = async (req, res, next) => {

    try {
        
        
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send({ error: error})
    }
}

module.exports = auth