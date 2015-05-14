require('./init');
var fs = require('fs');
var express = require('express');
var errorsParser = require('springbokjs-errors');
import { HtmlRenderer as ErrorHtmlRenderer } from 'springbokjs-errors/lib/HtmlRenderer';
var errorHtmlRenderer = new ErrorHtmlRenderer();
var app = express();

var argv = require('minimist')(process.argv.slice(2));

process.on('uncaughtException', function(err) {
    try {
        errorsParser.log(err);
    } catch (err2) {
        console.error(err2.stack);
    }
});


logger.setPrefix('app: ', logger.blue.bold);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.locals.basepath = argv.basepath || '/';

if (!argv.production) {
    console.log('Dev mode');
    app.use(require('connect-livereload')({
        port: argv.livereloadPort
    }));
    ['src', 'node_modules'].forEach((folder) => {
        app.use('/' + folder, express.static(__dirname +'/../../' + folder));
    });
} else {
    console.log('Production mode');
}

app.get('/', (req, res) => {
    try {
        res.render('index', { URL: req.path });
    } catch(err) {
        errorsParser.log(err);
        res.statusCode = 500;
        if (argv.production) {
            res.send('Error: ' + err.message);
        } else {
            res.send(errorHtmlRenderer.render(err));
        }
    }
});

app.use(express.static(__dirname +'/../../public'));

if (argv['socket-path']) {
    try {
        fs.unlinkSync(argv['socket-path']);
    } catch(err) {
    }
}

var port = argv.port || 3000;

app.listen(argv['socket-path'] || port, function() {
    if (argv['socket-path']) {
        fs.chmodSync(argv['socket-path'], '777');
    }
    logger.log('Listening on '
            +(argv['socket-path'] ? ' socket path ' + argv['socket-path'] : 'port ' + port));
});
