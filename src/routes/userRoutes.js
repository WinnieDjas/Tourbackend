import express from "express"; // package has role on routing and data management
import UserController from "../controllers/userController";
import Validator from "../middlewares/validator"
import DataChecker from "../middlewares/datachecker"


const userRouter = express.Router();

userRouter.post( //post is for sending data kuri server
    "/register",
   Validator.newAccountRules(),
   Validator.validateInput,
   DataChecker.isEmailExist,
   UserController.createUser); 
userRouter.post("/login",UserController.userLogin);   
userRouter.get("/all", UserController.getAllUsers); // get is for getting(kuzana) data kuri sever
userRouter.get("/:id", UserController.getOneUser);  // we put : on id for saying after slash  take data hold in id
userRouter.delete("/:id",UserController.deleteOneUser);


export default userRouter;