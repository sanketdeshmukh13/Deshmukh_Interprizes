const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
// const router = require("../router/auth-router");
// const express= require("express");

const home = async (req,res) => {
  try {
    res.status(200).send("Welcome to the routers");
  } catch (error) {
    console.log(error);
  }
};

// Registration Logic :

const register = async (req, res) => {
    try {
     console.log("users Registred");
      console.log(req.body);  // ---> to show data in the body
      const { username, email, phone, password } = req.body;
  
      const userExist = await User.findOne({ email });
  
      if (userExist) {
        return res.status(400).json({ message: "email already exists" });
      }
  
      const userCreated = await User.create({
         username,
         email,
         phone,
         password,
         });
  
      // res.status(201).json({ message: "User registered successfully" });
      res.status(201).json({
        msg: "Registration Successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Login page Logic:

  
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials Sanket" });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);
    // const isPasswordValid = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or passord " });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// To send user data - (user logic)

const user = async(req,res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData});
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

module.exports = {home, register, login,user};
  
 