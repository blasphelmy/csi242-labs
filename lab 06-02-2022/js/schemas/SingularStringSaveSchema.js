const mongoose = require("mongoose");

const SingularStringSchema = new mongoose.Schema({
    Test : {
        type: String,
        require: false
    }
});

const StringSaveModel = mongoose.model("StringSave", SingularStringSchema);

module.exports = StringSaveModel;