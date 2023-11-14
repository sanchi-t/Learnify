const User = require('../models/User');
const sequelize = require('../config/database')


exports.getUserProfile = async (req, res) => {

  const { username} = req.params;
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid' });
    }
    res.json({user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.saveUserProfile = (req, res) => {
  User.update(
    req.body.user, // Assuming the entire user profile is sent in the request body
    {where: { username: req.body.user.username }}
    ).then(userProfile => {
      return res.json(userProfile);
    })
    .catch(err => {
      return res.status(500).json({ error: 'Internal Server Error' });
    });
};
