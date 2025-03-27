const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

// Middlewares
app.use(express.json());
app.use(cors());

// Root Express Route
app.get('/', (req, res) => {
    res.send('Hola, Job Porter Server is Boiling!!!');
})

// Connect MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.63zdo.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        // Getting Job collection from DB
        const jobsCollection = client.db('JobPortal').collection('jobs');
        // Getting Job applications from DB
        const jobsApplicationCollection = client.db('JobPortal').collection('jobApplications');

        // -------------------------------------------Jobs related all apis-------------------------------------------

        // get all jobs
        app.get('/jobs', async (req, res) => {
            const jobs = await jobsCollection.find().toArray();
            res.send(jobs);
        });


        // get a single job
        app.get('/jobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await jobsCollection.findOne(query);
            res.send(result);
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(PORT);