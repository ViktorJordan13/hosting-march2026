require("dotenv").config(); // cita promenlivite od .env fajlot i gi staa vo process.env

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("../models/Student");

const app = express();

// dozvoluvame bilo koj klient/frontend da go pristapi nasiot server/backend
app.use(cors());

// ni ovozmozuva da citame JSON od req.body (bez ova req.body e undefined kaj POST baranjata)
app.use(express.json());

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DB} = process.env;

//URI - Unique Resource Identifier
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;

mongoose
    .connect(uri)
    .then(() => console.log("Mongo Database Connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    return res.send("Backend-ot raboti!");
});

//GET /data - gi vrakja site studenti od bazata
app.get("/data", async (req, res) => {
    try{
        const students = await Student.find();
        return res.json(students);

    }catch(err){
        return res.status(500).json({ message: err.message});
    }
});

// POST /data - dodava nov student vo bazata
app.post("/data", async(req, res) =>{
    try{
        const student = await Student.create({ name: req.body.name});
        return res.status(201).json(student);
        
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
});

const PORT = 5005;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app; //ova ke ni treba vo Cas 3 koga ke hostirame so Vercel