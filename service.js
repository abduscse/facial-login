const faceApi = require('./face-api');
const boom = require('@hapi/boom');
const users = require('./users');
const constants = require('./constants');

async function register(request, h) {
    console.log('User registration start');
    const email = request.query.email;
    const user = await users.getUser(email);
    if (!user) {
        const image = Buffer.from(request.payload);
        console.log('Face Detection Start');
        const detectedFaces = await faceApi.detectWithStream(image);
        console.log('Face Detection end');
        if (detectedFaces.length === 1) {
            const user = {
                faceId: detectedFaces[0].faceId,
                email: request.query.email
            };
            await users.saveUser(user);
            console.log('User registration Successful');
            return { email: user.email, message: 'User Registration Successful!' };
        } else {
            console.log('Invalid Image!', 'user registration failed');
            throw boom.badRequest('Invalid Image!');
        }
    } else {
        console.log('User already exists!', 'user registration failed');
        throw boom.badRequest('User already exists!');
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
            if (verificationResponse.isIdentical && verificationResponse.confidence >= constants.FACE_API_CONFIDENCE_THRESHOLD) {
                console.log('User Login Successful');
                return { email: user.email, message: 'User Login Successful!' };
            } else {
                console.log('Invalid Image!', 'user login failed');
                throw boom.badRequest('Invalid Image!');
            }
        } else {
            console.log('Invalid Image!', 'user login failed');
            throw boom.badRequest('Invalid Image!');
        }
    } else {
        console.log('Invalid Image!', 'user login failed');
        throw boom.notFound('Invalid User!');
    }
}
module.exports = {
    register,
    login
};