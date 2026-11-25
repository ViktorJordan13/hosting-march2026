// MIKROSERVIS 2: COURSES (lokalno na port 5002, na Verfcel posebna serverless funkcija)
require("dotenv").config(); // cita promenlivite od .env fajlot i gi staa vo process.env, na Vercel gi zema
//od Settings -> ENvironemnt Variables

const express = require("express");
const cors = require("cors");
const { connect } = require("../db");
const Course = require("../models/Course");

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

//GET /courses - gi vrakja site kursevi od bazata
app.get("/courses", async (req, res) => {
    try{
        const courses = await Course.find();
        return res.json(courses);

    }catch(err){
        return res.status(500).json({ message: err.message});
    }
});

// POST /courses - dodava nov kurs vo bazata
app.post("/courses", async(req, res) =>{
    try{
        const course = await Course.create({ name: req.body.name});
        return res.status(201).json(course);
        
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
});

// Na Vercel ne ni treba app.listen - Vercel sam go "budi" servisot koga ke dojde baranje
if(!process.env.VERCEL){

    const PORT = 5002;

    app.listen(PORT, () => {
        console.log(`Courses service is running at http://localhost:${PORT}`);
    });

}

module.exports = app;  // so ova Vercel go startuva servisot