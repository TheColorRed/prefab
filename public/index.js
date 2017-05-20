let compression = require('compression')
let express = require('express')
let app = express()

app.use(compression())
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/assets'));

app.locals = {
    name: 'Awesome'
}

app.get('/', (req, res) => {
    res.render('index', { page: 'home' });
}).get('/doc/css', (req, res) => {
    res.render('doc/css', { primaryPage: 'css', page: 'css' })
}).get('/doc/css/:page', (req, res) => {
    res.render('doc/css/' + req.params.page, { primaryPage: 'css', page: req.params.page })
}).get('/examples/:page', (req, res) => {
    res.render('examples/' + req.params.page, { primaryPage: 'css', page: req.params.page })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})