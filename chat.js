const users = [];

const messages = [];

function addMessage({
    sender,
    timestamp,
    text,
    image
}) {
    messages.push({
        sender,
        timestamp,
        text,
        image
    });
};

function addUser(username) {
    users.push(username);
};



const chat = {
    users,
    messages,
    addMessage,
    addUser
};

module.exports = chat;