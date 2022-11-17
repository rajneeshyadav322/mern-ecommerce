const User = require("../models/user");
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const logout = (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/auth/refresh_token" });
    return res.status(200).json({ msg: "Logged Out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};



const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ msg: "Wrong Credentials!" });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json({ msg: "Wrong Credentials!" });
    }

    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/auth/refresh_token",
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const register = async (req, res) => {
  const email = await User.findOne({ email: req.body.email });
  const pass = req.body.password;

  console.log(req.body)

  if (email) {
    return res.status(400).json({ msg: "This Email already exists." });
  }

  if (pass.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password should contain atleast 8 characters." });
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();

    const accessToken = createAccessToken({ id: newUser._id });
    const refreshToken = createRefreshToken({ id: newUser._id });

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      path: "/api/auth/refresh_token",
    });

    res.status(201).json({ accessToken });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const refreshToken = () => {
  (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) {
        return res.status(400).json({ msg: "Please Login or Register." });
      }

      jwt.verify(rf_token, process.env.JWT_REF, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register." });

        const accessToken = createAccessToken({ id: user.id });
        res.json({ accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SEC, { expiresIn: "2d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_REF, { expiresIn: "7d" });
};

module.exports = {
  login,
  logout,
  refreshToken,
  register,
};
