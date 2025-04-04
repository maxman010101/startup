const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const NewsAPI = require('newsapi'); // Using the NewsAPI package
const newsapi = new NewsAPI('1f1e7ab62d894e70922241b73fa2a4a4'); 

const authCookieName = 'token';


//let chats = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('username', req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.username, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});
  
// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('username', req.body.username);
  console.log(user);
  if (user) {
    console.log(await bcrypt.compare(req.body.password, user.password));
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});
  
// Logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});
  
// Middleware to verify that the user is authorized
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};
  
// Get all chats
apiRouter.get('/chats', verifyAuth, async (_req, res) => {
  const chats = await DB.getChats();
  res.send(chats);
});

// WebSocket server instance
const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
const peerServer = peerProxy(httpService);
  
// Create or update a chat
apiRouter.post('/chat', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  
  const existingChat = await DB.getChatByName(req.body.name);
  if (existingChat) {
    existingChat.messages = req.body.messages;
    existingChat.comments = req.body.comments;
    existingChat.date = req.body.date;
    await DB.updateChat(existingChat);
  } else {
    const newChat = {
      name: req.body.name,
      comments: req.body.comments || 0,
      date: req.body.date || new Date().toLocaleDateString(),
      messages: req.body.messages || []
    };
    await DB.addChat(newChat);

    // Send WebSocket notification about new chat
    const message = JSON.stringify({
      type: 'chatCreated',
      username: user.username, // Now includes the user's username
      chatName: newChat.name  // The new chat's name
    });
    peerServer.broadcast(message);
  }
  res.send(await DB.getChats());
});
  
//Fetch a random US headline using the NewsAPI package
apiRouter.get('/news', async (_req, res) => {
  try {
    // Get top headlines for the US
    const response = await newsapi.v2.topHeadlines({
      country: 'us'
    });
    if (response.articles && response.articles.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.articles.length);
      const randomArticle = response.articles[randomIndex];
      res.send({ title: randomArticle.title });
    } else {
      res.send({ msg: 'No articles found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Error fetching news' });
  }
});
  
// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});
  
// Serve default page for unknown paths
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
  
async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);
  return user;
}
  
async function findUser(field, value) {
  if (!value) return null;
  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}
  
// setAuthCookie sets the authentication cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });