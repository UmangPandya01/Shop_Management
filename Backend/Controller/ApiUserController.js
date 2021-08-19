const chalk = require('chalk');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Client = require('../model/client_model')

const Error = chalk.bold.red;
const Sucess = chalk.inverse.green;

exports.signUp = async (req, res, next) => {
    
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.name);
    console.log(req.name);
        Client.findOne({ email: req.body.email }).then(user => {
            console.log(user);

            if (user) {
                return res.status(400).send({error: 'User has already created account'})   
            }
            bcrypt.hash(req.body.password, 12).then((hashedpassword) => {
                
                const client = new Client({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedpassword,
                })

                client.save().then(
                    res.status(200).send(client)
                )
            })
            
        }).catch((error) => { console.log(error) })

}

exports.Login = async (req, res, next) => {
    
    try {
        
        const client = await Client.findOne({ email: req.body.email })
        console.log(client);
        if (!client) {
            return res.status(400).send({error: 'Please Signup first'})
        }

        const token = jwt.sign({ _id: client._id.toString() }, 'unavailnodejsSecretKey',{
            expiresIn: '7 days',
        })

        // clients.tokens = client.tokens.concat({ token: token })
        console.log(chalk.inverse(token));
        res.status(200).send({
            client,
            token
        })

    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send({ error: error})
    }
}