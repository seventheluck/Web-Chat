const chatWeb = {
  pageWrap: function(content) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/chat.css"/>
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            ${content}
          </div>
          <script src="/chat.js"></script>
        </body>
      </html>
    `;
  },
  loginPage: function() {
    return this.pageWrap(`
      <div class="login">
        <div class="login-input-panel">
          <form class="login-form" action="/login" method="POST">
            <input class="user-name" name="username" placeholder="Enter Username"/>
            <button class="submit-button" type="submit">Login</button>
          </form>
        </div>
      </div>
    `);
  },
  chatPage: function(chat, username) {
    return this.pageWrap(`
      ${this.logout(username)}
      <div class="display-panel">
        ${this.getUserList(chat)}
        ${this.getMessageList(chat)}
      </div>
      ${this.getOutgoing(username)}
    `);
  },
  logout: function(username) {
    return `
      <div class="logout">
        <form class="logout-form" action="/logout" method="POST">
          <input type="hidden" name="username" value="${username}"/>
          <button class="logout-btn" type="submit">Logout</button>
        </form>
      </div>
    `;
  },
  formatMessage: function(message) {
    return `
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
    `;
  },
  getMessageList: function(chat) {
    return `
      <ol class="messages">
      ${ chat.messages.map( this.formatMessage ).join('') }
      </ol>
    `;
  },
  formatUser: function(user) {
    return `
      <li class="user-list">
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `;
  },
  getUserList: function(chat) {
    return `
      <ul class="users">
        ${ Object.values(chat.users).map( this.formatUser ).join('') }
        <button class="unselect-btn" type="submit">Unselect</button>
      </ul>
      
    `;
  },
  getOutgoing: function(username) {
    return `
      <div class="outgoing">
        <form class="send" action="/chat" method="POST">
          <input type="hidden" name="username" value="${username}"/>
          <input class="to-send" name="text" value="" placeholder="Enter message to send"/>
          <button class="send-btn" type="submit">Send</button>
        </form>
        <form class="refresh" action="/" method="GET">
          <input type="hidden" name="username" value="${username}"/>
          <button class="refresh-btn" type="submit">Refresh</button>
        </form>
      </div>
    `;
  }
};
module.exports = chatWeb;
