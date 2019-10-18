const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const schema = require("./schema");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("Connected to database");
})

const app = express();
app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
}))

app.listen(5000, () => {
    console.log("Listening on port 5000");
})
