const mongoose = require('mongoose')


const connectionURL = process.env.CONNECTION_URL


mongoose.connect(connectionURL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

module.exports = mongoose;