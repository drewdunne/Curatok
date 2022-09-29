const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const cors = require('cors');

const cookieController = require('./controllers/cookieController');
const userRouter = require('./routes/user.js');

const PORT = 8080;

app.use(cookieParser());

// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(express.json());

app.use('/api/createuser', userRouter);

app.get('/api', (req, res) => {
  res.send({ title: 'Coding in Progress!' });
});

// app.get('/', cookieController.setCookie, (req, res) => {
//   res.statusCode = 200;
//   console.log('get request test');
//   console.log(res.cookies);
//   return res.send();
//   // res.json({ title: 'Coding in Progress' });
//   // res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
// });

app.use('/user', userRouter);

app.use((err, req, res) => {
  // defaultErr object
  const defaultErr = {
    log: 'Express error handler caught middleware error in unknown function',
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}...`);
});

module.exports = app;
