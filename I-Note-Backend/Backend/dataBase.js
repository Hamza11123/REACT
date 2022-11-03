const mongoose = require('mongoose');

const mongoURI_String = "mongodb://localhost:27017/TESTING"; // Connection-String To [Connect-Mongo], Mandontory For Deployment

const connectToMongo = async () => {
    try {
       const respnseAfterConnection = await mongoose.connect(mongoURI_String);
       console.log("Successfully Connected To Data-Base :)");
    } catch (_err) {
        console.log("Can't Connect: ", _err);
    }
}
module.exports = connectToMongo;
