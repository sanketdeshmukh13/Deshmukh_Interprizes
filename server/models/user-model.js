const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Hashing the password before saving
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, saltRound);
    this.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate JSON Web Token
userSchema.methods.generateToken = function () {
  try {
    const token = jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY // Ensure this environment variable is properly set
      // {
      //   expiresIn: "30d", // expires in 30 days
      // }
    );
    console.log("Generated Token:", token); // Log the generated token for debugging
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

// Define the model
const User = mongoose.model("User", userSchema);

module.exports = User;
