const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.use(express-static('/'));
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({extended: true}));
app.use (session( {
secret: 'keyboard cat',
resave: false,
saveUnitialized: true,
}))

app.use(function (req, res, next){
  req.session.users = {
  users = req.sessions.users = {
    Joe: 'thedude',
    Boaz: 'pingpong',
    Brandon: 'beer'
  };

  next();
})

app.get('/',function (req, res, next) {
  if (req.session.username) {
    res.send('Greetings' + req.session.username)
  } else {
    res.redirect('/login');
  }
})

app.get('/login', function(req, res, next) {
  res.render('index')
})

app.post('/', function (req, res, next) {
  if (req.session.users[req.body.username] === req.body.password) {
    req.session.username = req.body.username;
  }
  res.redirect('/')
})


app.listen(3000, function () {
  console.log('Successfully started express application!');
});
