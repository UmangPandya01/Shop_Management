const Appointment = require('../model/appointment_model')
const Barber = require('../model/barber_model')
const chalk = require('chalk')

// const serviceType = {
//     haircut: 1,
//     shaving: 2,
//     setting: 3,
//     masssage: 4,
//     haircolor: 5,
// } 

//? get all appointment - Client
exports.getAllAppointment = async (req, res, next) => {

    try {
    
        await req.client.populate({
            path: 'appointments', model: 'Appointment',
        }).execPopulate()
        
        console.log(chalk.inverse(req.client.appointments));
        res.status(200).send(req.client.appointments)

    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send({error: error})
    }
}

//? Add new appointment -Client
exports.addAppointment = async (req, res, next) => {
    
    try {
        
        const barber = await Barber.findOne({ number: req.body.number })
        console.log(chalk.inverse(barber));

        const isAvailable = await Appointment.findOne({
            barberID: barber._id,
            slote: req.body.slote,
        })

        if (isAvailable) {
            res.status(401).send({ error: 'Slote is already booked!' })
        }
        else {
            const appointment = new Appointment({
                ...req.body,
                clientID: req.client._id,
                barberID: barber._id,
                slote: req.body.slote,
                isEmpty: false,
            })
            // console.log(chalk.inverse(appointment));
            await appointment.save()
            res.status(200).send(appointment)
        }

    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send({error: error})
    }
}

//? Delete appointment - Client 
exports.deleteByID = async (req, res, next) => {

    try {
        console.log(req.params.id);
        const deletedAppointment = await Appointment.findOneAndDelete({
            _id: req.params.id,
            clientID: req.client._id
        })

        if (!deletedAppointment) {
            res.status(400).send({error: 'Task not found'})
        }
        res.status(200).send(deletedAppointment)
        console.log(chalk.greenBright.inverse('Appointment is deleted Successfully'));

    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send({error: error})
    }
}

exports.emptyslotes = async (req, res) => {

    try {
        fillSlotes()
        const appointments = await Appointment.find({barberID: req.query.barberID})
        console.log(chalk.inverse(appointments));
        
        if (!appointments) {

            //* For display
            slotes.forEach((slote) => {
                console.log(chalk.green.inverse(slote));
            })
        }
        
        else {
            appointments.forEach((appointment) => {
                // console.log(appointment.barberID);
                if (appointment.barberID == req.query.barberID) {
                    slotes[appointment.slote - 1] = (appointment.isEmpty)
                }
            
            })

            //* For display
            slotes.forEach((slote) => {
                if (slote)
                    console.log(chalk.green.inverse('Available'));
                else
                    console.log(chalk.red.inverse('Not Available'));
            })
        console.log(slotes);
            res.status(200).send(slotes)
        }

    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send({error: error})
    }
}
var slotes = []
function fillSlotes()  {
    console.log('getting slotes');
    for (let index = 0; index < 18; index++) {
        slotes[index] = true;
    }
}