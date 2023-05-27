import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken"; // importing this library, the code gains access to pre-built functions and tools that make it easier to create, verify, and work with JWTs.

export const registerController = async (req, res) => {
  try {
    const { name, email, password, mobile, address } = req.body;
    //============check for validation =========================
    if (!name) {
      return res.send({ error: "Name is required!" });
    }
    if (!email) {
      return res.send({ error: "Email is required!" });
    }
    if (!password) {
      return res.send({ error: "Password is required!" });
    }
    if (!mobile) {
      return res.send({ error: "Please enter phone number!" });
    }
    if (!address) {
      return res.send({ error: "Please enter your address" });
    }

    //============check for user =========================
    const exisitingUser = await userModel.findOne({ email });
    //----check if user existhing or not-----
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "The account has been register!",
      });
    }

    //----register user----
    //used to save the hashed password in the user object.
    const hashedPassword = await hashPassword(password);
    //save save weuuuuuiii
    const user = await new userModel({
      name,
      email,
      mobile,
      address,
      password: hashedPassword,
    }).save(); // the user object simpan db or data storage system using the save() method.

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};
//Miira lps dah selasa done this database run balik check on postman n database msk x.
//Klu hang lupa pi bukak postman and ttp://localhost:3000/api/v1/auth/register
// Then try enter database in the postman at body>>raw>>Json and add the schema details
// b4 u run POST, hang perlu run server dulu nak check okay ke x.. klu ade problem pi jumpa pakgpt
//then click post and check mongodb hang. ithink you put e >> users. then the data user will be display there
//oh yee hang jgn lupa concept rest yaa important. remember 4 only POST,GET,UPdate,DELETE

//========POST LOGIN===========
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //============check for validation =========================
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password. Try again!",
      });
    }
    //----check if user existing or not-----
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered! Please sign up!",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        adddress: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
//In this area for login point.. if the user is not in database the postman will counter 
//said !user function. but remember u add the previous test on register "Sarah"? 
//now you gotta summon sarah by enter the email n password to check samaada wujud ke x kat db

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};