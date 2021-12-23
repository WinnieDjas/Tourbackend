import express from "express"; // package has role on routing and data management
import UserController from "../controllers/userController";
import Validator from "../middlewares/validator";
import DataChecker from "../middlewares/datachecker";
import verifyToken from "../middlewares/verifyToken";
import verifyAccess from "../middlewares/verifyAccess";


const userRouter = express.Router();

userRouter.post("/register",
    
   Validator.newAccountRules(),
   Validator.validateInput,
   DataChecker.isEmailExist,
   UserController.createUser); 
userRouter.post("/login",UserController.userLogin);   
userRouter.get("/all", UserController.getAllUsers); // get is for getting(kuzana) data kuri sever
userRouter.get("/profile/:id", UserController.getOneUser);  // we put : on id for saying after slash  take data hold in id
userRouter.delete("/profile/:id",UserController.deleteOneUser); 


// booking paths

userRouter.post(
    "/book/:id",
    verifyToken,
    verifyAccess("user"),
    UserController.bookTour

);
userRouter.get("/Bookings/all",UserController.getAllBookingsTours);
userRouter.get(
        "/Bookings/:idtour",
        verifyToken,
        verifyAccess("admin"),
        UserController.getAllBookingByTourId); 
userRouter.get(
            "/Bookings",
            verifyToken,
            verifyAccess("user"),
            UserController.getAllBookingByUserId);    


export default userRouter;