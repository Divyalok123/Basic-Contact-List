//requiring mongoose
const mongoose = require('mongoose');

//opening a connection
mongoose.connect('mongodb://localhost:27017/contact_list_db', {useNewUrlParser: true, useUnifiedTopology: true});

//getting access to the connection
const db = mongoose.connection;

//managing the connection
db.on('error', console.error.bind(console, "Error Occured!"));

//once the connection is set
db.once('open', function(){
    console.log("Connection Successful, YAY!!")
});