const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail =  require('../utils/sendEmail')
require("dotenv").config();




exports.registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, transactionPin } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password not matching" });
    }

    const ExistUser = await User.findOne({ email });

    if (ExistUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = await bcrypt.hash(transactionPin, 10);

    // ✅ SAFE OTP METHOD
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpires = Date.now() + 40 * 60 * 1000;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      transactionPin: hashedPin,
      otp,
      otpExpires,
      isVerified: false // ✅ IMPORTANT
    });

    await sendEmail(
      email,
      "Your OTP Code",
      `Your OTP code is ${otp}. It expires in 10 minutes.`
    );

    res.status(201).json({
      message: "OTP sent to your email. Please verify your account"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/// otp verification
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    
    if (user.otp.toString() !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    //console.log("Saved OTP:", user.otp)
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ message: "Acoount verifed sucessfuly", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//user login
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      
      if (!user.isVerified) {
        return res.status(403).json({ message: "Please verify OTP first" });
      }

      // Generate JWT token directly in the function
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        message: "Logged in successfully",
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


