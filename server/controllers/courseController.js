const User = require('../models/User');




exports.getCourse = async (req, res) => {
  const { courseName} = req.query;
  console.log(courseName);

//   try {
//     const user = await User.findOne({ where: { username } });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     // const validPassword=user.password;

//     if (!validPassword) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
};
