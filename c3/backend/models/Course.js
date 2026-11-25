const mongoose = require("mongoose");

//Schema - kako izgleda eden kurs vo bazata

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true //.trim() //  __Nikola.trim() = Nikola
        },
    },
    { timestamps: true } // avtomatski dodava createdAt i updatedAt
);

// Model - so nego citame i zapisuvame vo kolekcijata "courses"
module.exports = mongoose.model("Course", courseSchema);