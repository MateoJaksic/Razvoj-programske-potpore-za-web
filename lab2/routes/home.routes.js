const express = require('express');
const router = express.Router();
const data = require('../data/mydata.js');

router.get('/', (req, res, next) => {
    res.redirect('/home/getCategories');
});

router.get('/getCategories', (req, res, next) => {
    let id = 0;

    const kategorije = {};
    const proizvodi = {};
    for(let i=0; i<data.categories.length; i++){
        kategorije[i] = { 
            name: data.categories[i].name.toString() 
        };
    }
    for(let i=0; i<data.categories[id].products.length; i++){
        let proizvod = data.categories[id].products[i].name.replace(' ', '_');
        if(req.session.cart !== undefined){
            if(req.session.cart[proizvod] !== undefined){
                proizvodi[i] = {
                    name: data.categories[id].products[i].name.toString(),
                    image: data.categories[id].products[i].image.toString(),
                    value: req.session.cart[proizvod],
                    kosarica: req.session.counter
                }
            } else {
                proizvodi[i] = {
                    name: data.categories[id].products[i].name.toString(),
                    image: data.categories[id].products[i].image.toString(),
                    value: 0,
                    kosarica: req.session.counter
                }
            }
        } else {
            proizvodi[i] = {
                name: data.categories[id].products[i].name.toString(),
                image: data.categories[id].products[i].image.toString(),
                value: 0,
                kosarica: req.session.counter
            }
        }
    }        

    return res.render('home', {
        id_kategorije: id,
        tren_kategorija: data.categories[id].name,
        proizvodi: proizvodi,
        za_refresh: JSON.stringify(proizvodi),
        kategorije: kategorije,
        kosarica: req.session.counter
    });
});

router.get('/getProducts/:id', (req, res, next) => {
    const id = parseInt(req.params.id) - 1;

    if (data.categories[id] === undefined){
        return res.status(404).send('404 Not Found');
    }

    const kategorije = {};
    const proizvodi = {};
    for(let i=0; i<data.categories.length; i++){
        kategorije[i] = { 
            name: data.categories[i].name.toString() 
        };
    }
    for(let i=0; i<data.categories[id].products.length; i++){
        let proizvod = data.categories[id].products[i].name.replace(' ', '_');
        if(req.session.cart !== undefined){
            if(req.session.cart[proizvod] !== undefined){
                proizvodi[i] = {
                    name: data.categories[id].products[i].name.toString(),
                    image: data.categories[id].products[i].image.toString(),
                    value: req.session.cart[proizvod],
                    kosarica: req.session.counter
                }
            } else {
                proizvodi[i] = {
                    name: data.categories[id].products[i].name.toString(),
                    image: data.categories[id].products[i].image.toString(),
                    value: 0,
                    kosarica: req.session.counter
                }
            }
        } else {
            proizvodi[i] = {
                name: data.categories[id].products[i].name.toString(),
                image: data.categories[id].products[i].image.toString(),
                value: 0,
                kosarica: req.session.counter
            }
        }
    }  

    return res.render('home', {
        id_kategorije: id,
        tren_kategorija: data.categories[id].name,
        proizvodi: proizvodi,
        za_refresh: JSON.stringify(proizvodi),
        kategorije: kategorije,
        kosarica: req.session.counter
    });
});

router.post('/getProducts/:kategorija/add/:id', (req, res, next) => {
    const kategorija = parseInt(req.params.kategorija) - 1;
    const id = (req.params.id);

    if (req.session.cart === undefined){
        req.session.cart = {};
    }
    if (req.session.cart[id] === undefined){
        req.session.cart[id] = 1;
        if (req.session.counter === undefined){
            req.session.counter = 1;
        } else {
            req.session.counter += 1;
        }
    } else {
        req.session.cart[id] += 1;
        req.session.counter += 1;
    }
    
    res.sendStatus(204);
});

module.exports = router;