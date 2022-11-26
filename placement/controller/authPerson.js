
const jwt = require("jsonwebtoken")

exports.loginStudent = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
      if (user) {
        if (!user.isLoggedIn) {
            
            if (password==user.token) {
            jwt.sign(
              { user: { id: user._id } },
              process.env.jsonwebtoken,
              { expiresIn: "1h" },
              async (err, tok) => {
                
                await user.save();
               
                res.json({
                  user:user,
                 token:tok,
                });
              }
            );
          } else {
            res.status(401).json({ error: "Password Incorrect" });
          }
        } else {
          res.status(400).json({
            error: "User Already Logged In",
          });
        }
      } else {
        res.status(400).json({ error: "No User Exist" });
      }
    });
  };
  

  exports.addUser = async (req, res) => {
    const { name, phoneNumber, dob, email, course } = req.body;
    const token = phoneNumber
  
    const phoneExist = await User.findOne({ phoneNumber });
    if (phoneExist)
      return res.status(400).json({ error: "The phone number already exists" });
  
  
    const emailExist = await User.findOne({ email: email });
    if (emailExist)
      return res.status(400).json({ error: "email already exists" });
  
    const user = new User({
      name,
      phoneNumber,
      dob,
      email,
      token,
      course,
    });
  
    await user.save();
  
    res.status(200).json({ user });
  };