const mongoose = require('mongoose'); //if required in other file too both will have same instance

/* Creating Contact Schema */

const contactSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

//we need to specify what will be the name of the collection in our database
/* "Model" signifies the connection */
const Contact = mongoose.model('Contact', contactSchema);

//we need to export it
module.exports = Contact; 