const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://BloodHome:9mcbGRTFDVriv4fQ@blooddonor.e9745cf.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const DonorCollection = client.db('BloodDonor').collection('DonorDetail');
        const BloodRequestCollection = client.db('BloodDonor').collection('BloodRequest');


        app.post('/DonorDetail', async (req, res) => {                          //post the value on server
            const donor = req.body;
            const result = await DonorCollection.insertOne(donor);
            res.send(result);
        });

        //for all donore details
        app.get('/DonorDetail', async (req, res) => {                           //get the value from server
            const quary = {}
            const cursor = DonorCollection.find(quary);
            const DonorDetail = await cursor.toArray();
            res.send(DonorDetail);

        });



        app.get('/DonorDetail/query', async (req, res) => {
            const query = req.query;
            console.log(query);
            const Product = DonorCollection.find(query);
            const result = await Product.toArray();
            res.send(result)
        })


        // app.get('/DonorDetail/:district', async (req, res) => {
        //     const district = req.params.district;
        //     const quary = { district: district };
        //     const Product1 = DonorCollection.find(quary);
        //     const result1 = await Product1.toArray();
        //     res.send(result1);

        // });


        // app.get('/DonorDetail/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const quary = { email: email };
        //     const Product = DonorCollection.find(quary);
        //     const result = await Product.toArray();
        //     res.send(result);

        // });

        //for blood request
        app.get('/BloodRequest', async (req, res) => {                  //get the value from server
            const quary = {}
            const cursor = BloodRequestCollection.find(quary);
            const BloodRequest = await cursor.toArray();
            res.send(BloodRequest);

        });

        app.post('/BloodRequest', async (req, res) => {                  //post the value on server
            const donor = req.body;
            const result = await BloodRequestCollection.insertOne(donor);
            res.send(result);
        });

        app.get('/BloodRequest/:email', async (req, res) => {
            const email = req.params.email;
            const quary = { email: email };
            const Product = BloodRequestCollection.find(quary);
            const result = await Product.toArray();
            res.send(result);

        });


        app.delete('/BloodRequest/:id', async (req, res) => {
            const id = req.params.id;
            const quary = { _id: new ObjectId(id) };
            const Product = await BloodRequestCollection.deleteOne(quary);
            res.send(Product);
        });






    } finally {

    }
}
run().catch(err => connsole.error(err));




app.get('/', (req, res) => {
    res.send("Ok Simple Node Server Running");
});

app.listen(port, () => {
    console.log(`Server Running on : ${port}`);
});

