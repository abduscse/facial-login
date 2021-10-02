const users = [
    {
        faceId: '1234',
        email: 'abdus@gmail.com',
    }
];

function addUser(user) {
    console.log('save user start');
    users.push(user);
    console.log('save user end');
    return user;
}

function getUser(email) {
    console.log('get user start');
    const user = users.find(user => user.email === email);
    if (user) {
        console.log('user exists');
    } else {
        console.log('user does not exists');
    }
    return user;
}

function getAllUsers() {
    return users;
}

module.exports = {
    addUser,
    getUser,
    getAllUsers
};