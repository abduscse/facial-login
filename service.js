const faceApi = require('./face-api');

function register(request, h) {
    const user = {
        email: request.payload.email,
        imageUrl: request.payload.imageUrl
    };
    return 'Registration successful';
}
function login(request, h) {
    return 'Login successful';
}
function check(request, h) {
    return 'Check successful';
}
module.exports = {
    register,
    login,
    check
};