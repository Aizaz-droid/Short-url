const mongoose = require('mongoose');

//Hum schema bnainge
const urlSchema = new mongoose.Schema({
    //Inside neeche properties hain URL ki
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    //Visithistory 1 array hai jis k andr hum dkh skte kitne baje click huwa
    visitHistory: [{ timestamp: { type: Number } }],
},
    { timestamps: true }
);

const URL = mongoose.model('url', urlSchema);

module.exports = URL;