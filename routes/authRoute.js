import express from "express";
import { registerController, loginController,testController } from "../controllers/authController.js";
import {isAdmin, requireSignIn} from "../middlewares/authmiddleware.js"
//router object
const router = express.Router();

//routing
//=============REGISTER ||METHOD POST=======
router.post("/register", registerController); 
//This where you use on POSTMAN each of them have their own [purpose]

//===========LOGIN || POST
router.post("/login", loginController);
//This where you use on POSTMAN

//=========TEST Route
router.get('/test',requireSignIn,isAdmin, testController);
//To run test remember to check at the API function 





export default router;
