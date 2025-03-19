const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const chatCollection = db.collection('chat');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function getChats() {
    return await chatCollection.find({}).toArray();
  }
  
  async function getChatByName(name) {
    return await chatCollection.findOne({ name: name });
  }
  
  async function addChat(chat) {
    await chatCollection.insertOne(chat);
  }
  
  async function updateChat(chat) {
    await chatCollection.updateOne({ name: chat.name }, { $set: chat }, { upsert: true });
  }

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getChats,
    getChatByName,
    addChat,
    updateChat
  };