const express = require('express');
const exphbs  = require('express-handlebars');
const routes = require('./routes/index');
const port = process.env.PORT || 8887;
const app = express();

app.engine('hbs', exphbs({defaultLayout: 'index', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use('/', routes);

app.listen(port, () => {
  console.log(`This app is running on http://localhost:${port}`);
});
