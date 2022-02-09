# Express-REST-API-Example
 A simple example of building a REST API with Express. In this example, we will be using a local MongoDB database, and we'll be creating our interface for a trip cost calculator app.

----------------
## Our Endpoints

Create a new trip with a gvien name:

    POST  /trip  { name }

Get a list of all trips:

    GET   /trips

Add a new expense to a trip:

    POST  /expense  { trip, date, amount, category, description }

`trip` is the ID of the selected trip.

`category` is the category name for the expense. This will come from a static list of categories: `travel`, `food`, `accomodation`, `fun`.

    GET  /expenses  { trip }


