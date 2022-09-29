const bcrypt = require('bcrypt');
const Message = require('../Message');
const User = require('../models/user');
const db = require('../models/db');

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(Message(
      'Did not include a username or password!',
      'userController.createUser: request did not include required properties',
      400,
    ));
  }

  const hash = bcrypt.hashSync(password, 10);

  // poo.query('some string', '[ user ])

  const user = User.create({
    username,
    password: hash,
  });

  db.createTable();
  // then insert
  //   const createUserQuery = 'INSERT ONE ';
};
