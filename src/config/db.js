const mongoose = require('mongoose');
// const uri = "mongodb+srv://juanmabascu:Juanma12@cluster0.3mbzcp9.mongodb.net/?retryWrites=true&w=majority";
 
const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected...`);
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://juanmabascu:Juanma12@cluster0.3mbzcp9.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// module.exports = client;