const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { Op } = require("sequelize");
const users = require('./../models').user;

const router = express.Router();

const requireAdmin = (req,res,next) => {
    try {
        // console.log('require admin middleware');

        if (!req.user.isAdmin) {
            const error = new Error("You are not authorized to access this resource.");     
            error.statusCode = 403;
            throw  error;
        }
        next();
    } catch(err) {
        next(err);
    }

}

router.get('/',passport.authenticate('jwt', {session: false}), requireAdmin,(req, res,next) => {
    users.findAll()
    .then(result => {
        // console.log(result); 
        return result;
    })
    .then(result => res.status(200).json({result}))
    .catch(err => {
        // console.log(err); 
        next(err);
    });
});
router.get('/logout', (req, res) => {
    // console.log('#### test logout ####');
    res.clearCookie('token');
    res.send('user logout requested.');
  });

router.post('/login', async (req, res,next) => {
    try {
        const {username ='', email='', password} = req.body;
        if(!username && !email) {
            const error = new Error("Invalid user parameters.");     
            error.statusCode = 400;
            throw  error;
        }

        const pendingUser = await users.scope('withPassword').findOne({
            where: {
                [Op.or]: [
                    {username},
                    {email}
                ]
            }
        }).catch(err => {
        const error = new Error("Failed to look up details.");     
           error.statusCode = 400;
           throw error;
        });

        if(!pendingUser) {
            const error = new Error("1. Invalid credentials.");     
            error.statusCode = 400;
            throw error;
        }
        // console.log(pendingUser.id);

        const isMatch = await bcrypt.compare(password, pendingUser.password);

        if(!isMatch) {
            const error = new Error("2. Invalid credentials.");     
            error.statusCode = 400;
            throw error;
        }

        const token = jwt.sign({
            id: pendingUser.id
            },
            process.env.JWT_SECRET, {
            expiresIn: '600m'
            }
        )
        
        const newDate = new Date(Date.now());
        newDate.setMinutes(newDate.getMinutes()+600);
        
        res.cookie('token', token, {
            expires: newDate,
            secure: false,
            httpOnly: true,
            sameSite: 'lax'
        });
        // console.log(newDate.toDateString());
        // console.log(token);
        
        await res.json({message:'user login success.', token: token});
    } catch (err) {
        next(err)
    }
  });

  
router.get('/checkAuth', passport.authenticate('jwt', { session: false, failWithError: true }),
  function(req, res, next) {
    // Handle success
    const id = req.user.id;
      const email = req.user.email;
      const username = req.user.username;
    //   console.log(`${id} | ${username} | ${email}`);
    return res.json({ isAuth: true, message: 'Logged in' });
  },
  function(err, req, res, next) {
    // Handle error
    return next(err);
  }
)


router.post('/register', async (req,res,next) => {
    const {username, email, password, firstName, lastName, gender} = req.body;
    try {
        const checkUserExists = await users.findOne({
            where: {
            [Op.or]: [
                {username},
                {email}
            ]}
        });
    
        if (checkUserExists) {
            const error = new Error('User Already Exists!');
            error.statusCode = 400;
            throw error;
        }

        const saltRounds = 10;
        const hashedPassword =  await bcrypt.hash(password, saltRounds);
        
        const newUser =  await users.create({ 
            username, 
            password: hashedPassword, 
            firstName, 
            lastName, 
            email, 
            gender
        }).catch(err => {
            err.statusCode = 400;
            throw err;
        });

        const newUserWithoutPassword = await users.findOne({
            where: {id: newUser.id}
        });
        await res.json({newUserWithoutPassword});
    } catch (err) {
        next(err);   
    }

})

router.get('/:id',(req,res, next) => {
    users.findOne({
        where: {id: req.params.id}
    })
    .then(result => {
        if (!result) {
            const error = new Error("User Not Found");
            error.statusCode = 404;
            throw error;
        }
        return result;
    })
    .then(user => res.status(200).json({user}))
    .catch(err => {
        next(err);
    });
});

module.exports = router;