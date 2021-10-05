const face_api = require('face-api.js');

async function register(request, h) {
    const input = request.payload.imageELement;
    const detections = await face_api.detectAllFaces(input);
    console.log(detections)
    return 'success';
}

module.exports = {
    register
};