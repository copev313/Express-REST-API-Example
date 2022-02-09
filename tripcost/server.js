const express = require('express')
const mongo = require('mongodb').MongoClient


const app = express()

// Use JSON middleware:
app.use(express.json())

const url = "mongodb://localhost:27017"
const dbName = "tripcost"

// Connect to local MongoDB instance:
let db, trips, expenses
mongo.connect(
    url, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            console.log(err)
            return
        }
        // Database instance:
        db = client.db(dbName)
        // Collection for storing trips:
        trips = db.collection("trips")
        // Collection for storing expenses:
        expenses = db.collection("expenses")
    }
)


// POST /trip:
app.post("/trip", (req, res) => {
    const name = req.body.name
    trips.insertOne({name: name}, (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        console.log(result)
        res.status(200).json({ ok: true })
    })
})


// GET /trips:
app.get("/trips", (req, res) => {
    trips.find().toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ trips: items })
    })
})


// POST /expense:
app.post("/expense", (req, res) => {
    expenses.insertOne(
        {
            trip: req.body.trip,
            date: req.body.date,
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description,
        },
        (err, result) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            res.status(200).json({ ok: true })
        }
    )
})


// GET /expenses:
app.get("/expenses", (req, res) => {
    expenses.find({ trip: req.body.trip }).toArray(
        (err, items) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            res.status(200).json({ expenses: items })
        }
    )
})


// Start the server:
app.listen(3000, () => {
    console.log("Server started!")
})
