const express = require('express')
const morgan = require('morgan')

// ! -- Variables
const app = express()
const port = 3000
/* 1. Your application should have a dummy database with a different theme to the users lesson. It should
 look similar to this with your own data: */
const events = [
    { type: 'music', location: 'Royal Festival Hall', name: 'Mahler’s Resurrection' },
    { type: 'sport', location: 'Tower Bridge', name: 'London Half Marathon' },
    { type: 'sport', location: 'Rio Cinema', name: 'LOTRO ONLINE' },
    { type: 'sport', location: 'Rio Cinema', name: 'EibraB' },
    { type: 'film', location: 'Rio Cinema', name: 'Overated movie' },
    { type: 'film', location: 'Rio Cinema', name: 'Babylon 4' },
    { type: 'music', location: 'Rio Cinema', name: 'The singers curse' },
    { type: 'film', location: 'Rio Cinema', name: 'Skibidi Toilet' },
    { type: 'film', location: 'Rio Cinema', name: 'Barbie 3' },
    { type: 'sport', location: 'Rio Cinema', name: 'Socccer 2' },
    { type: 'music', location: 'Rio Cinema', name: 'Yeh eh yeh' },

]
/* 2. You should have a logger middleware, either using [morgan](https://www.npmjs.com/package/morgan) or
 custom building your own. */
app.use(morgan('dev'));

//parsing the request bodies
app.use(express.json());



/* 4. Your API should have the following capabilities for data manipulation: 
  - An index route
  - A show route (single entry)
  - A create route
  - A delete route
  - An update route. */

//index
app.get('/events', (req, res) => {
    return res.render("index.ejs", {
        events: events,
    });

})
//single entry
app.get('/events/:eventId', (req, res) => {
    //if the id is not a number or the index is too big for the event array error message
    if (isNaN(Number(req.params.eventId)) || req.params.eventId > events.length) {
        return res.status(404).send("<p>No event witht hat id  found</p>")
    }

    let arrayEvents = [events[req.params.eventId]];
    return res.render("index.ejs", {
        events: arrayEvents,
    });

})

//create form
app.get('/createEvent', (req, res) => {
    return res.render("eventForm.ejs");

})

//Couldnt get the form to work properly
app.post('/createEvent', (req, res) => {
    if (req.body.name && req.body.type && req.body.location) {
        events.push({
            name: req.body.name,
            type: req.body.type,
            location: req.body.location,
        })
    }
    console.dir(events);
    return res.render("eventForm.ejs");

})
//delete currently uses the index for the array, its not a most optimal solution 
app.post('/delete/:id', (req, res) => {
    //if the id is not a number or the index is too big for the event array error message
    let id = req.params.id;
    if (isNaN(Number(id)) || id > events.length) {
        return res.status(404).send("<p>No event witht hat id  found</p>")
    }
    events.splice(id, 1);
    console.dir(events);
    return res.send("Element deleted succesfuly.");

})

//update
//not sure if the update metod should be post or get
app.post('/updateEvent/:id', (req, res) => {
    let id = req.params.id;
    if (isNaN(Number(id)) || id > events.length) {
        return res.status(404).send("<p>No event witht hat id  found</p>")
    }
    if (req.body.name && req.body.type && req.body.location) {
        events[id] = {
            name: req.body.name,
            type: req.body.type,
            location: req.body.location,
        };
    }
    console.dir(events);

    return res.render("eventForm.ejs");

})


/* 3. You should have a Route Not Found middleware that catches any requests that don't match the ones your API offers.
 */
app.use('*', (req, res) => {
    return res.status(404).send("Error");

})

// Start the Express server
app.listen(port, () => {
    console.log(`🚀 Express api lab on ${port}`)
})