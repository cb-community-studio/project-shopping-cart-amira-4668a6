//check the function of middleware

import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
      const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };
  //Basically, verifying the JWT token in the request header before allowing access to protected routes



  //==========Admin Access
  export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "WARNING! Unauthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };

  //For the area to check whether it ok or not, is that you need 
  //retrive the data from token. 
  //Sng citer on Postman the authorization warning will appear bxoz u not admin. to set it 
  //pgi kt mongodb and change the role to 1...it will access..to change, just return 0.