const path = require('path');

const express = require('express');
const router = express.Router();

const UsersJson = require('../js/users-json.js');
const users = new UsersJson(path.join(__dirname, '..', 'db', 'users.json'));

router.get('/users', (req, res) => {
  // const { userLogin, userPassword } = req.body;

  res.send(users.obj);
});

router.get('/users/:userLogin', (req, res) => {
  const userLogin = req.params.userLogin;
  const user = users.getUserByLogin(userLogin);

  console.log('User:', user);
  res.send(user);
});

router.post('/register', (req, res) => {
  const regUser = req.body;

  if (!regUser.login || !regUser.password) {
    return res.status(403).send({ success: false, message: 'Wrong email or password.'});
  }

  if (users.isUserExist(regUser.login)) {
    return res.status(403).send({ success: false, message: 'This login is already taken.'});
  }

  const registeredUser = users.registerUser(regUser);

  if (registeredUser) {
    return res.send(registeredUser);
  }

  return res.status(500).send({ success: false, message: 'Error during user registration.'});
});

module.exports = router;
