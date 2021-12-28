const express = require('express');
const router = express.Router();
const passport = require('passport');

const cart = require('./../models').cart;
const user = require('./../models').user;
const cartItem = require('./../models').cartItem;
const product = require('./../models').product;

router.get('/',passport.authenticate('jwt',{session:false}),(req, res, next) => {
    const userId = req.user.id;


    user.findOne({where: {id: userId}})
    .then(result => {
        if (!result) {
            const error = new Error("No user found.");
            error.statusCode = 404;
            return error;
        }
        return result;
    })
    .then((fetchedUser) => {{
        return cart.findOrCreate({ 
            where: {
                userSeq: fetchedUser.seq
            }});

    }})
    .then(unused => {
        // Use 'get' magic method on sequelize user model from request. Join on cartItem model
        return req.user.getCart();
    })
    .then(userCart => {
        // Use 'get' magic method on sequelize user model from request. Join on cartItem model
        // return req.user.getCart({include: cartItem});
        return userCart.getProducts({ order: [['seq', 'ASC']]});
    })
    .then((fetchedCart) => {
        return res.status(200).json({fetchedCart});
    })
    .catch(err => {
        next(err);
    })

});

router.post('/',passport.authenticate('jwt',{session:false}),(req, res, next) => {
    const userId = req.user.id;
    const {productSeq,productQuantity, productSize} = req.body;
    let fetchedUserCart;
    let fetchedUserSeq;
    user.findOne({where: {id: userId}})
    .then(result => {
        if (!result) {
            const error = new Error("No user found.");
            error.statusCode = 404;
            return error;
        }
        return result;
    })
    .then((fetchedUser) => {{
        fetchedUserSeq = fetchedUser.seq;
        return cart.findOrCreate({ 
            where: {
                userSeq: fetchedUser.seq
            }})

    }})
    .then(unused => {
    //     // Use 'get' magic method on sequelize user model from request. Join on cartItem model
        return req.user.getCart();
    })
    .then(fetchedCart => {
        const fetchedCartId = fetchedCart.id;
        fetchedUserCart = fetchedCart;

        return cartItem.findOne({
            where: {
                cartId: fetchedCartId,
                size:productSize,
                productSeq: productSeq
            }
        });
    })
    .then(fetchedProduct => {
        let newQuantity = Number.parseInt(productQuantity);
        
        if (fetchedProduct) {
            newQuantity += fetchedProduct.quantity;
            if (newQuantity === 0) {
                return fetchedProduct.destroy();
            }
            return fetchedProduct.update({ quantity: newQuantity});    
        }

        return cartItem.create({
            quantity: newQuantity,
            size: productSize,
            cartId: fetchedUserCart.id,
            productSeq: productSeq
        });

    })
    .then((addedCartItem) => {
        return res.status(200).json({addedCartItem});
    })
    .catch(err => {
        next(err);
    })

});

router.delete('/:id',passport.authenticate('jwt',{session:false}),(req, res, next) => {
    cartItemId = req.params.id;
    const userId = req.user.id;
    // let fetchedCart;
    let fetchedUserSeq;
    user.findOne({where: {id: userId}})
    .then(result => {
        if (!result) {
            const error = new Error("No user found.");
            error.statusCode = 404;
            return error;
        }
        return result;
    })
    .then((fetchedUser) => {{
        fetchedUserSeq = fetchedUser.seq;
        return cart.findOrCreate({ 
            where: {
                userSeq: fetchedUser.seq
            }})

    }})
    .then(user => {
        return req.user.getCart();
    })
    .then(fetchedCart => {
        return cartItem.destroy({
            where: {
                id: cartItemId,
                cartId: fetchedCart.id
            },
            returning: true
        });
    })
    .then((deleteCartItem) => {
        return res.status(200).json({deleteCartItem});
    })
    .catch(err => {
        next(err);
    })

});

router.patch('/',passport.authenticate('jwt',{session:false}),(req, res, next) => {
    const userId = req.user.id;
    const {cartItemId,cartItemQuantity} = req.body;
    let fetchedUserSeq;
    user.findOne({where: {id: userId}})
    .then(result => {
        if (!result) {
            const error = new Error("No user found.");
            error.statusCode = 404;
            return error;
        }
        return result;
    })
    .then((fetchedUser) => {{
        fetchedUserSeq = fetchedUser.seq;
        return cart.findOrCreate({ 
            where: {
                userSeq: fetchedUser.seq
            }})

    }})
    .then(user => {
        return req.user.getCart();
    })
    .then(fetchedCart => {
        return cartItem.update({ 
            quantity: cartItemQuantity
            }, {
            returning: true,
            where: {
                id: cartItemId,
                cartId: fetchedCart.id
            },
            
        });    
    })

    .then((updatedCartItem) => {
        if (updatedCartItem === 1) {
            // console.log(updatedCartItem);
        }
        return res.status(200).json({updatedCartItem});
    })
    .catch(err => {
        next(err);
    })

});

module.exports = router;