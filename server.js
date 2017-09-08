const express = require('express');
const app = express();
require('./config/express.js')(app);
app.listen(app.get('port'), () => {
    console.log(app.get('port'))
});

module.exports = app;