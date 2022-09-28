const Message = require('../Message');


const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(Message(
      'Did not include a username or password!',
      'userController.createUser: request did not include required properties',
      400,
    ));

    const hash = bcrypt.hashSync(password, 10);
  }
};
