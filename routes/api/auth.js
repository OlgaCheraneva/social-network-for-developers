const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const {check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Get auth user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/',
    [
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        try {
            const user = await User.findOne({email});

            if (!user) {
                return res
                    .status(400)
                    .json({errors: [{msg: 'Invalid Credentials'}]});
            }

            const isCorrectPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!isCorrectPassword) {
                return res
                    .status(400)
                    .json({errors: [{msg: 'Invalid Credentials'}]});
            }

            const payload = {user: {id: user.id}};

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn: 36000000},
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
