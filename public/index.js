let compression = require('compression')
let express = require('express')
let app = express()
require('dotenv').config()

app.use(compression())
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/assets'));

app.locals = {
    name: 'Prefab'
}

app.get('/', (req, res) => {
    res.render('index', { page: 'home' });
}).get('/doc/:section', (req, res) => {
    res.render('doc/' + req.params.section, { section: req.params.section, page: req.params.section })
}).get('/doc/:section/:page', (req, res) => {
    res.render('doc/' + req.params.section + '/' + req.params.page, { section: req.params.section, page: req.params.page })
}).get('/examples/:page', (req, res) => {
    res.render('examples/' + req.params.page, { section: 'css', page: req.params.page })
})

app.listen(process.env.EXPRESS_PORT, function () {
    console.log('Example app listening on port ' + process.env.EXPRESS_PORT + '!')
})