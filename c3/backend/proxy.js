// PROXY (samo lokalno) - posrednik: frotend-ot zboruva samo so proxy-to (port 5005),
// a proxy-to go prakja baranjeto do vistinskiot mikroservis
// Na Vercel ovaa rabota ja pravi vercel.json (rewrites)

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const STUDENTS_URL= "http://localhost:5001";
const COURSES_URL= "http://localhost:5002";

//funkcija koja go prepraka baranjeto(GET ili POST vo slucajov) do daden mikroservis
const forwardTo = (serviceUrl) => async (req, res) => {
    console.log(`Proxy: ${req.method} ${req.originalUrl} ->
        ${serviceUrl}${req.originalUrl}`)

    try{

        const response  = await fetch(`${serviceUrl}${req.originalUrl}`, {
            method: req.method,
            headers: { "Content-Type": "application/json"},
            body: req.method === "GET" ? undefined : JSON.stringify(req.body),
        });

        const data = await response.json();
        return res.status(response.status).json(data);

    }catch(err){
        //mikroservisot e isklucen ili ne odgovara
        return res.status(502).json({ message: `Servisot ${serviceUrl} ne e dostapen!`});
    }
};

// /students servis(5001), courses -> courses servis(5002)
app.use("/students", forwardTo(STUDENTS_URL));
app.use("/courses", forwardTo(COURSES_URL));

const PORT = 5005;

app.listen(PORT, () => {
    console.log(`Proxy is running at http://localhost:${PORT}`);
});