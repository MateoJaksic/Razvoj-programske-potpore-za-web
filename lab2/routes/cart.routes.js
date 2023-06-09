const express = require('express');
const router = express.Router();
const data = require('../data/mydata.js');

router.get('/', (req, res, next) => {
    const proizvodi = {} 
    if (req.session.cart !== undefined){    
        for(let i=0; i<req.session.cart.length; i++){
            proizvodi[i] = {
                name: req.session.cart[i].name, 
                value: 1
            }
        }
    } 

    return res.render('cart', {
        proizvodi: proizvodi
    });
}); 

router.post('/add/:id', (req, res, next) => {
    const id = req.params.id;

    req.session.cart[id] += 1;
    req.session.counter += 1;

    return res.render('cart');
});

router.post('/remove/:id', (req, res, next) => {
    const id = req.params.id;

    if (req.session.cart[id] !== undefined && req.session[id] !== 0){
        req.session.cart[id] -= 1;
        req.session.counter -= 1;
    } 
    if (req.session.cart[id] === 0){
        delete req.session.cart[id];
    }

    return res.render('cart');
});

router.get('/create/:id', (req, res, next) => {
    const id = req.params.id;

    if (req.session.created === undefined){
        req.session.created = {};
    } 
    
    req.session.created[id] = 1;

    res.sendStatus(204);
});

router.get('/getAll', (req, res, next) => {

    if (req.session.cart === undefined){
        req.session.cart = {}
    }

    const proizvodi = req.session.cart;

    res.json({proizvodi});
});

module.exports = router;