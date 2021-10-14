const faceApiJs = require('face-api.js');

async function register(request, h) {
    console.log(request.payload);
    // const input = request.payload.imageElement;
    // const detections = await faceApiJs.detectAllFaces(input);
    // console.log(detections)
    return 'success';
}

module.exports = {
    register
};