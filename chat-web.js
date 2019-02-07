const chatWeb = {
  chatPage: function (chat, username) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="chat.css"/>
            <title>Chat</title>
        </head>
        <body>
            <div id="chat-app">
            <div class="display-panel">
                <ul class="users">
                ${this.userListTemplate(chat)}
                </ul>
                <ol class="messages">
                ${this.messageListTemplate(chat)}
                </ol>
            </div>
            ${this.outgoingTemplate(username)}
            </div>
        </body>
        </html>
        `;
  },

  userListTemplate: function (chat) {
    return Object.values(chat.users).map(user => `
        <li>
            <div class="user">
                <span class="name-userslist">${user}</span>
            </div>
        </li>
    `).join('');
  },

  messageListTemplate: function (chat) {
    return chat.messages.map(message => `
        <li>
          <div class="message">
            <div class="meta-info">
              <div class="sender-info">
                <img class="avatar" alt="user-avatar" src="/images/avatar-bao.jpg"/>
                <span class="username">${message.sender}</span>
              </div>
              <div class="message-info">
                <span class="timestamp">${message.timestamp}</span>
              </div>
            </div>
            <p class="message-text">${message.text}</p>
          </div>
        </li>
      `).join(''); //TODO: Why is there a comma without using .join('').

  },
  outgoingTemplate: function (username) {
    return `
        <div class="outgoing">
            
            <form class="to-send-form" action="/chat" method="POST">
            <input class="to-send" name="text" value="" placeholder="Enter message to send"/>
            <input type="hidden" name="username" value="${username}" placeholder="Enter message to send"/>
            <button class="to-send-btn" type="submit">Send</button>
            </form>

            <form class="refresh-form" action="/" method="GET">
            <input type="hidden" name="username" value="${username}" placeholder=""/>
            <button class="refresh-btn" type="submit">Refresh</button>
            </form>
            
            <form class="logout-form" action="/logout" method="POST">
            <input type="hidden" name="username" value="${username}" placeholder=""/>
            <button class="logout-btn" type="submit">Logout</button>
            </form>
            
            
        </div>`;
  }
  // TODO: "text" in name="text" === "text" in server.js: const {text} = req.body;
};

module.exports = chatWeb;