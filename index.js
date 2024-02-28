const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const { MONGO_URL } = process.env
const { PORT } = process.env
const User = require("./Models/userSchema")



const app = express()
app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 5050,
    })
    .then(() => console.log("MongoDB is  connected successfully"))
    .catch((error) => console.log(error));


app.get("/", (req, res) => {
    res.send("Hello")
})


app.post('/', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err))
}
)




app.listen(PORT, () => {
    console.log("Server is running");
})