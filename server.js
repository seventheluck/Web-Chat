const express = require('express');
const chatWeb = require('./chat-web');
const chat = require('./chat');
const loginWeb = require('./login-web');
const app = express();
const port = 3000;
app.use(express.static('./public'));

app.get('/', (req, res) => {
  const username = req.query.username;
  if (username === undefined)
    res.redirect('/login');
  res.send(chatWeb.chatPage(chat, username));
})

app.get('/login', (req, res) => {
  res.send(loginWeb.loginPage());
});

app.post('/login', express.urlencoded({
  extended: false
}), (req, res) => {
  const {
    username
  } = req.body;
  chat.users.map(user => {
    if (user === username)
      res.redirect('/login'); // get /user
  });

  chat.addUser(username);
  res.redirect('/?username=' + username);
});

app.post('/logout', express.urlencoded({
  extended: false
}), (req, res) => {
  const {
    username
  } = req.body;
  const index = chat.users.indexOf(username);
  if (index > -1)
    chat.users.splice(index, 1);
  res.redirect('/');
});

app.post('/chat', express.urlencoded({
  extended: false
}), (req, res) => {
  const {
    username
  } = req.body;
  const sender = username;
  const {
    text
  } = req.body;
  chat.addMessage({
    sender,
    timestamp: new Date(),
    text
  });
  res.redirect('/?username=' + username);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));