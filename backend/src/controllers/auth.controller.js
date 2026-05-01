import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";
import bcryptjs from "bcryptjs";
import {createOtpEmailTemplate} from "../emails/otpEmailTamplates.js";

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user:ENV.EMAIL,
    pass:ENV.EMAIL_PASSWORD,
  }
})

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // check if emailis valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // 123456 => $dnjasdkasj_?dmsakmk
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      try {
        await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    // never tell the client which one is incorrect: password or email

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
export const sendOtp = async(req, res)=>{
  try {
    const {email} = req.body;
    const user = await User.findOne({email:email});
    
    if(!user){
      return res.status(404).json({success:"failure", message: "User doesn't exist"})
    }

    let otp = generateOTP();
    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000 //10 min expiry
    let name = user.fullName;

    await user.save();

    const mailOption = {
      from: ENV.EMAIL,
      to: email,
      subject: "Your LinkUp Verification Code",
      html: createOtpEmailTemplate(otp , name),
    };

    await transporter.sendMail(mailOption);

    res.status(200).json({ message: "OTP has been sent to your email" });


  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
};

export const verifyOtp = async (req, res)=>{
  try {
    const {email , otp} = req.body;
    const user =  await User.findOne({email});

    if (!user || user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.status(200).json({ message: "OTP verified" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const changePassword = async (req, res)=>{
  try {
    const {email , otp, newPassword} = req.body;
    const user =  await User.findOne({email});

    if (!user || user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
