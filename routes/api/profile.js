const router = require('express').Router();
const normalize = require('normalize-url');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id,
        }).populate('user', ['avatar', 'name']);

        if (!profile) {
            return res.status(400).json({msg: 'No profile for this user'});
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills are required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        } = req.body;

        // Building the profile object
        const profileFields = {
            user: req.user.id,
            company,
            website:
                website === '' ? '' : normalize(website, {forceHttps: true}),
            location,
            bio,
            status,
            githubusername,
            skills: Array.isArray(skills)
                ? skills
                : skills.split(',').map((skill) => skill.trim()),
        };

        // Building the social object and adding to profileFields
        const socialFields = {
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        };

        for (const [key, value] of Object.entries(socialFields)) {
            if (value !== undefined && value.length) {
                socialFields[key] = normalize(value, {forceHttps: true});
            }
        }

        profileFields.social = socialFields;

        try {
            let profile = await Profile.findOne({user: req.user.id});

            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                );
            } else {
                // Create
                profile = new Profile(profileFields);
                await profile.save();
            }

            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
