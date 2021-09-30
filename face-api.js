const msRest = require('@azure/ms-rest-js');
const faceApi = require('@azure/cognitiveservices-face');
const config = require('./config');

const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': config.FACE_API_KEY } });
const client = new faceApi.FaceClient(credentials, config.FACE_API_HOST);

async function detectWithStream(stream) {
    return await client.face.detectWithStream(stream);
}
async function verifyFaceToFace(faceId1, faceId2) {
    return await client.face.verifyFaceToFace(faceId1, faceId2);
}
module.exports = {
    detectWithStream,
    verifyFaceToFace
};