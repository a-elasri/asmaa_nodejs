var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const { routerAuth } = require('./auth/auth')

var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles');
var tagsRouter = require('./routes/tags');
var commentsRouter = require('./routes/comments');
var usersRouter = require('./routes/users');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/tags', tagsRouter);
app.use('/comments', commentsRouter);
app.use('/auth', routerAuth);
module.exports = app;