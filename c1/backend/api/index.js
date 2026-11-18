const express = require("express");
const cors = require("cors");

const app = express();

// dozvoluvame bilo koj klient/frontend da go pristapi nasiot server/backend
app.use(cors());

const data = [
    { id: 1, name: "Ace"},
    { id: 2, name: "Riste"},
    { id: 3, name: "Svetlana"},
];

app.get("/", (req, res) => {
    return res.send("Backend-ot raboti!");
});

app.get("/data", (req, res) => {
    return res.json(data);
});

const PORT = 5005;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app; //ova ke ni treba vo Cas 3 koga ke hostirame so Vercel