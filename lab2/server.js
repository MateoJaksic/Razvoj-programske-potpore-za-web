// uvoz modula
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const data = require('./data/mydata.js');

// uvoz modula s definiranom funkcionalnosti ruta
const homeRouter = require('./routes/home.routes');
const cartRouter = require('./routes/cart.routes');

// middleware - predlošci (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware - statički resursi
app.use(express.static(path.join(__dirname, 'public')));

// middleware - dekodiranje parametara
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// sjednica
app.use(session({
    secret: 'web-lab2',
    resave: false,
    saveUninitialized: true
}));

// definicija root rute
app.get('/', (req, res) => {
    res.redirect('/home/getCategories');
});

// definicija ruta
app.use('/home', homeRouter); // potencijalno '/home'
app.use('/cart', cartRouter);

// definicija rute za mydata.js i script.js
app.get('/data/mydata.js', function(req, res){
    res.sendFile('C:/Users/Mateo/Desktop/Organizacija/CodeProjects/Web/lab2/data/mydata.js');
});
app.get('/public/scripts/script.js', function(req, res){
    res.sendFile('C:/Users/Mateo/Desktop/Organizacija/CodeProjects/Web/lab2/public/scripts/script.js');
});

// pokretanje servera na vratima 3000
app.listen(3000);
