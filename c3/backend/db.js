//Zaednicka konekcija so MongoDB Atlas - ja koristat site mikroservisi
const mongoose = require("mongoose");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DB} = process.env;

//URI - Unique Resource Identifier
// encodeURIComponent - ako lozinkata ima specijalni znaci (@, #, / ...) da ne go "skrsi" linkot
const uri = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;

const connect = () => {
    mongoose
        .connect(uri)
        .then(() => console.log("Mongo Database Connected"))
        .catch((err) => console.log(err));
};

module.exports = { connect };
