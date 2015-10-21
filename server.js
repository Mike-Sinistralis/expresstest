var express = require('express'),
	compression = require('compression'),
	path = require('path'),
	config = require('./serverConfig'),
	logger = require('morgan'),
	cookieParser = require('cookieParser'),
	bodyParser = require('body-parser'),
	app = express();

var controllers = {
	index: require('./controllers/index')
}

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('x-powered-by', false);
app.set('view engine', 'ejs' );


app.use(compression({threshold: 1}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use('/', controllers.index);

app.listen(config.build.port, function() {
	console.log('The server is running on port %s', config.build.port);
});