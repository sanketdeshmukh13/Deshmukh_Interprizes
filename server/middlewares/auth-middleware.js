const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {

        return res 
        .status(401)
        .json({message: "Unauthorized HTTP , Token not provided"});
    }



//     console.log("token from auth middleware", token);
//     next();
// };

const jwtToken = token.replace("Bearer", "").trim();
console.log("token from auth middleware", jwtToken);

try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log(isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({
        password:0,
    });

    req.user = userData;
    // req.token = jwtToken;     -------> CHANGES IN THIS FIELD
    req.token = token;
    req.userID = userData._id;

    next();
} catch (error) {
    return res.status(401).json({ message: "Unathorized, Invalid token."});
    
}
};

module.exports = authMiddleware;