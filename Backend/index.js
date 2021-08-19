const express = require('express');
require('./Database/mongoose')
const cors = require('cors')

// ? Routes for API
const serviceRouteAPI = require('./Routes/ApiService')
const clientRouteAPI = require('./Routes/ApiClient')
const barberRouteAPI = require('./Routes/ApiBarber')
const appointmentAPI = require('./Routes/ApiAppointment')
const productAPI = require('./Routes/ApiProduct')
const cartAPI = require('./Routes/ApiCart')
const orderAPI = require('./Routes/ApiOrder')

const path = require('path');

const serviceRoutes = require('./Routes/service');
const port = process.env.PORT || 7000;
const app = express();
// app.use(cors())

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, '../Client/views'));

app.use(express.json())
// ! 
// app.use(express.static(__dirname + "/views"));

app.use(serviceRoutes);
app.use(serviceRouteAPI)
app.use(clientRouteAPI)
app.use(barberRouteAPI)
app.use(appointmentAPI)
app.use(productAPI)
app.use(cartAPI)
app.use(orderAPI)
console.log('working');

app.use((req, res, next) => {
    res.render('error', {PageTitle: 'Page not found'});
})
app.listen(port, () => {
    console.log(`Server rocking at: ${port}`)
})