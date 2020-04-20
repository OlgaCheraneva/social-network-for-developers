const config = require('config');
const request = require('request');
const router = require('express').Router();
const normalize = require('normalize-url');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');
const Post = require('../../models/Post');
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

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (_req, res) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'avatar',
            'name',
        ]);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/user/:id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.id,
        }).populate('user', ['avatar', 'name']);

        if (!profile) {
            return res.status(400).json({msg: 'Profile not found'});
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if (error.name === 'CastError') {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        await Post.deleteMany({user: req.user.id});
        await Profile.findOneAndDelete({user: req.user.id});
        await User.findOneAndDelete({_id: req.user.id});

        res.json({msg: 'User deleted'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const newExperience = ({
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        } = req.body);

        try {
            const profile = await Profile.findOne({user: req.user.id});
            profile.experience.unshift(newExperience);
            await profile.save();

            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/profile/experience/:experience_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:experience_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        const removeIndex = profile.experience
            .map((item) => item.id)
            .indexOf(req.params.experience_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
    '/education',
    [
        auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldofstudy', 'Field of study is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const newEducation = ({
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        } = req.body);

        try {
            const profile = await Profile.findOne({user: req.user.id});
            profile.education.unshift(newEducation);
            await profile.save();

            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   DELETE api/profile/education/:education_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:education_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        const removeIndex = profile.education
            .map((item) => item.id)
            .indexOf(req.params.education_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/github/:username
// @desc    Get user repositories from Github
// @access  Public
router.get('/github/:username', async (req, res) => {
    try {
        const options = getUserReposOptions(req.params.username);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
            }

            if (response.statusCode !== 200) {
                return res.status(404).json({msg: 'Github profile not found'});
            }

            res.json(JSON.parse(body));
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

function getUserReposOptions(username) {
    return {
        uri: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${config.get(
            'githubClientId'
        )}&client_secret=${config.get('githubClientSecret')}`,
        method: 'GET',
        headers: {'user-agent': 'node.js'},
    };
}

module.exports = router;
