const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

var server = app.listen(3000, () => console.log(`Server running at ${server.address().port}!`));
