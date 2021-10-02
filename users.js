const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    faceId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});
const userModel = mongoose.model('users', userSchema);

function saveUser(user) {
    return new userModel(user).save();
}
function getUser(email) {
    return userModel.findOne({ email });
}

module.exports = {
    saveUser, getUser
};