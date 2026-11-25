// MIKROSERVIS 1: STUDENTI (lokalno na port 5001, na Verfcel posebna serverless funkcija)
require("dotenv").config(); // cita promenlivite od .env fajlot i gi staa vo process.env, na Vercel gi zema
//od Settings -> ENvironemnt Variables

const express = require("express");
const cors = require("cors");
const { connect } = require("../db");
const Student = require("../models/Student");

const app = express();

//dozoluvame SAMO nasite frontend-i da pristapat, toa se lokalniot i onoj na Vercel
const allowedOrigins = ["http://localhost:5173"];

if(process.env.FRONTEND_URL){
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({ origin: allowedOrigins }));

// ni ovozmozuva da citame JSON od req.body (bez ova req.body e undefined kaj POST baranjata)
app.use(express.json());

connect();

//GET /students - gi vrakja site studenti od bazata
app.get("/students", async (req, res) => {
    try{
        const students = await Student.find();
        return res.json(students);

    }catch(err){
        return res.status(500).json({ message: err.message});
    }
});

// POST /students - dodava nov student vo bazata
app.post("/students", async(req, res) =>{
    try{
        const student = await Student.create({ name: req.body.name});
        return res.status(201).json(student);
        
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
});

// Na Vercel ne ni treba app.listen - Vercel sam go "budi" servisot koga ke dojde baranje
if(!process.env.VERCEL){

    const PORT = 5001;

    app.listen(PORT, () => {
        console.log(`Students service is running at http://localhost:${PORT}`);
    });

}

module.exports = app;  // so ova Vercel go startuva servisot