require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error_middleware");


// let's tackle the cors
const corsOption = {
   origin: "http://localhost:5173",
   methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
   Credentials: true,
};

app.use(cors(corsOption));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// Lets define admin route

app.use("/api/admin", adminRoute);


app.use(errorMiddleware);


// app.get("/", (req, res) => {
//     res.status(200).send('welcome sanket');
// });
// app.get("/register", (req, res) => {
//     res.status(200).send('welcome to registration page sanket');
// });



const PORT = 5000;
connectDb().then(() => {
app.listen(PORT, () => {
   console.log(`server is running at:${PORT}`);
});
});