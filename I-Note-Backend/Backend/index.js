const express = require('express');
const app = express();

const connectToMongo = require('./dataBase');
const cors = require('cors')  // It Helps Alot To Make [Request-From-Front-End]

const port = 80;

connectToMongo();

app.use(cors());  // The Middle Ware Is Used To Make The Request through [Front-End], OtherWise We'll Get 'Error', And It wouldn't Be Possible To Communicate With Server For The Client

// We Gotta Use app.use(express.json()) To Use "req.body"
app.use(express.json());    // Middle-Ware To Fetch Json-Data  From User

// Routes, 
app.use("/api/auth", require("./routers/auth"));
app.use("/api/notes", require("./routers/notes"));


app.get('/', (req, res) => {
    return res.json({message: "success"});
});

// app.get('/login', (req, res) => {
//     return 	res.json({message: "Login Page"});
// });
 
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
