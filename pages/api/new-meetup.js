import { MongoClient } from 'mongodb';

// ============================== Notes ==============================
// code inside of the api file will not run on client side/secure
// /api/new-meetup - if a request is made to this url, it will trigger the function defined in this file
// req/request - object which contains data about the incomming request
// res/response - object needed for sending back a response

// The destructuring assignment syntax is a JavaScript expression that makes it 
//  possible to unpack values from arrays, or properties from objects, into distinct variables.

// Mongodb
// npm install 'mongodb' package - official mongodb package, which makes
//  sending queries to mongodb easier
// MongoClient - This object allows us to connect to mongodb
// methods - https://docs.mongodb.com/manual/reference/method/js-collection/
// ===================================================================

async function handler (req, res) {
  if (req.method === 'POST') { //only POST request will trigger this function
    const data = req.body;

    //connecting to mongodb database
    //code below never! runs on client side for obv reasons
    const client = await MongoClient.connect('mongodb+srv://adminHQ:meetupslive@meetups.abzya.mongodb.net/meetups?retryWrites=true&w=majority');
    //db method gets hold of database we're connecting to
    const db = client.db();

    //where all meetup data is stored/collected
    const meetupsCollection = db.collection('meetups');
   
    //Creates a new document in a collection.
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close()

    res.status(201).json({message: 'Meetup Inserted!'});
  };
};

export default handler; 