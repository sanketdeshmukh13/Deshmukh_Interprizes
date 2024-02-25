const { z } = require("zod");

const loginSchema = z.object({
    
   email: z
   .string({ required_error: "email is Required "})
   .trim()
   .min(3, { message: "Enter a Valid Email"})
   .max(20, { message: "email must not be greater than  20 characters"}),

   password: z
   .string({ required_error: " password is Required "})
   .trim()
   .min(3, { message: " password must be at least of 3 characters"})
   .max(100, { message: " password must not be greater than  100 characters"}),

});

// Creating an Object schema

// const signupSchema = z.object({
  
// Creating a object Schema
const signupSchema = loginSchema.extend({
    username: z
    .string({ required_error: "Name is Required "})
    .trim()
    .min(3, { message: "Name must be at least of 3 characters"})
    .max(100, { message: "Name must not be greater than  100 characters"}),

   phone: z
    .string({ required_error: "phone is Required "})
    .trim()
    .min(10, { message: "phone number is invalid"})
    .max(10, { message: "phone must not be greater than  10 characters"}),

});
module.exports ={signupSchema, loginSchema };