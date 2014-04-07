var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(require('connect-livereload')());


app.get('/', function(req, res) {
    res.render('index');
});

app.use(express.static(__dirname +'/../../public'));

app.listen(3000);