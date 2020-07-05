/** @format */

//requiring express
const express = require("express");

//setting the port
const port = 3000;

//getting path
const path = require("path");

//requiring configuration for setting up the database
const db = require("./config/mongoose");

//requiring contact
const Contact = require("./models/contact");
const { create } = require("./models/contact");

//getting express
const app = express();

//setting the view engine (template engine)
app.set("view engine", "ejs");

//setting the path for templates
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.urlencoded({ extended: true }));

//for using stactic files
app.use(express.static("assets"));

// var contactList = [
// 	{
// 		name: "Divyalok Jaiswal",
// 		number: "9999999999",
// 	},
// 	{
// 		name: "Uday Jaiswal",
// 		number: "5555555555",
// 	},
// 	{
// 		name: "Luffy",
// 		number: "4204204201",
// 	},
// ];

app.get("/", function (req, res) {
	/* 
        find goes to the database and executes the query('{}') (none for now)
        and finds every contact in the database  
    */

	Contact.find({}, function (err, contacts) {
		if (err) {
			console.log("!!! Error !!!");
			return;
		}

		return res.render("home", {
			contact_list: contacts,
		});
	});

	// return res.render("home", {
	// 	contact_list: contactList,
	// });
});

app.post("/create-contact", function (req, res) {
	//commenting it as we will be pushing data to our database now
	// contactList.push(req.body);

	Contact.create(
		{
			name: req.body.name,
			number: req.body.number,
		},
		function (err, newcontact) {
			if (err) {
				console.log("Error occured while creating the contact!");
				return;
			}
			console.log("New contact created! -> ", newcontact);
			res.redirect("back");
		},
	);

	// return res.redirect("back");
});

app.get("/delete-contact", function (req, res) {

    /* we will be using id to delete item from database */
	console.log(req.query);
	// let number = req.query.number;
    let id = req.query.id;

    // let contactIndex = contactList.findIndex((contact) => contact.number == number);
	// contactList.splice(contactIndex, 1);
    
    //get the element with that id in database
    Contact.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log("Error while deleting!");
            return;
        }

        return res.redirect('back');
    });

	// return res.redirect("back");
});

app.listen(port, function (err) {
	if (err) {
		console.log("Error Occured!");
		return;
	}
	console.log("Server is running @ port: ", port);
});
