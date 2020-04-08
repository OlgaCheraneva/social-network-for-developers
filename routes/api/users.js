const bcrypt = require('bcryptjs');
const config = require('config');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check(
            'password',
            'Enter a password with 6 or more characters'
        ).isLength({min: 6}),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;

        try {
            let user = await User.findOne({email});

            if (user) {
                return res
                    .status(400)
                    .json({errors: [{msg: 'User already exists'}]});
            }

            const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
            user = new User({
                name,
                email,
                password,
                avatar,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

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
