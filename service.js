const faceApi = require('./face-api');
const boom = require('@hapi/boom');
const users = require('./users');
const config = require('./config');

async function register(request, h) {
    console.log('User registration start');
    const image = Buffer.from(request.payload);
    console.log('Face Detection Start');
    const detectedFaces = await faceApi.detectWithStream(image);
    console.log('Face Detection end');
    if (detectedFaces.length === 1) {
        const user = {
            faceId: detectedFaces[0].faceId,
            userEmail: request.query.email
        };
        users.addUser(user);
        console.log('User registration Successful');
        return { userEmail: user.userEmail, message: 'User Registration Successful!' };
    } else {
        console.log('User registration Failed');
        throw boom.badRequest('Invalid Image!');
    }
}
async function login(request, h) {
    console.log('user login start');
    const email = request.query.email;
    const user = await users.getUser(email);
    if (user) {
        console.log('user login successful');
        const image = Buffer.from(request.payload);
        console.log('Face Detection Start');
        const detectedFaces = await faceApi.detectWithStream(image);
        console.log('Face Detection end');
        if (detectedFaces.length === 1) {
            const faceId1 = user.faceId;
            const faceId2 = detectedFaces[0].faceId;
            console.log('Face Verification start');
            const verificationResponse = await faceApi.verifyFaceToFace(faceId1, faceId2);
            console.log('Face Verification end');
            if (verificationResponse.isIdentical && verificationResponse.confidence >= config.FACE_API_CONFIDENCE_THRESHOLD) {
                console.log('User Login Successful');
                return { userEmail: user.userEmail, message: 'User Login Successful!' };
            } else {
                console.log('user login failed1');
                throw boom.badRequest('Invalid Image!');
            }
        } else {
            console.log('user login failed2');
            throw boom.badRequest('Invalid Image!');
        }
    } else {
        console.log('user login failed3');
        throw boom.notFound('Invalid User!');
    }
}
module.exports = {
    register,
    login
};