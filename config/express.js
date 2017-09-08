const bodyParser = require('body-parser');
const parameters = require('./parameters.js');
const Go = require('gonode').Go;
const go = new Go({
    path: './go/f2c.go',
    initAtOnce	: true
}, err => {
    if (err) {
        console.log(err);
    }
});

module.exports = app => {
    app.use(bodyParser.json());                                     
    app.use(bodyParser.urlencoded({extended: true}));               
    app.use(bodyParser.text());                                    
    app.use(bodyParser.json({ type: 'application/json'}));
    app.set('port', parameters.port);
    app.use('/', function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    //exemplo: http://localhost:3001/f2c/90
    app.use('/f2c/:f', (req, res) => {
        console.log(req.params.f);
        go.execute({f: parseFloat(req.params.f)}, (result, response) => {
            return res.json({c: response.c? response.c: NaN});
        });
    });

    return app;
};

process.on('SIGINT', () => {
    go.close();
    process.exit(0);
});