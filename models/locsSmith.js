const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locsSmithSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    addr: { type: String, required: true },
    phone: { type: Number, required: false },
    email: { type: String, required: false },
    clientrating: { type: Number, required: false },
    braiding: { type: Boolean, required: true },
    hairlocs: { type: Boolean, required: true }
});

const LocsSmith = mongoose.model("LocsSmith", locsSmithSchema);

module.exports = LocsSmith;
