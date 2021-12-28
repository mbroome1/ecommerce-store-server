const express = require('express');
const router = express.Router();
const passport = require('passport');

const product = require('./../models').product;

router.get('/',(req, res, next) => {
    product.findAll({ order: [['seq', 'ASC']]})
    .then(products => res.status(200).json({products}))
    .catch(err => {
        next(err);
    });
});

router.get('/:id', passport.authenticate('jwt', {session: false}),(req, res, next) => {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        const error = new Error("Invalid Input");
        error.statusCode = 422;
        throw error;
    }
    product.findOne({ where : {id: id}})
    .then(result => {
        console.log("RESULT: ", result);
        if (!result) {
            const error = new Error("Not found from products");
            error.statusCode = 404;
            throw error;
        }
        return result;
    })
    .then(product => res.status(200).json({product}))
    .catch(err => {
        // console.log(err.name);
        // console.log(err.message);
        // console.log(err.statusCode);
        next(err);
    });
});

module.exports = router;