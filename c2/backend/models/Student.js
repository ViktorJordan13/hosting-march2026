const mongoose = require("mongoose");

//Schema - kako izgleda eden student vo bazata

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true //.trim() //  __Nikola.trim() = Nikola
        },
    },
    { timestamps: true } // avtomatski dodava createdAt i updatedAt
);

// Model - so nego citame i zapisuvame vo kolekcijata "students"
module.exports = mongoose.model("Student", studentSchema);