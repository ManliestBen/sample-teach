var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');

require('./config/database'); 

var todosRouter = require('./routes/api/todos');

var app = express();

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// api routes (these must come before the catch all route)
app.use('/api/todos', todosRouter);

// route to catch all (this must come AFTER api routes)
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});