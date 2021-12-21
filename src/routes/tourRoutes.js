import express from "express"; 
import TourController from "../controllers/tourController";
import Validator from "../middlewares/validator";
import verifyToken from "../middlewares/verifyToken";
import verifyAccess from "../middlewares/verifyAccess";

const tourRouter = express.Router(); //This function express.Router() is used when you want to create a new router object in your program to handle requests.

tourRouter.post("/createTours",
    verifyToken,
    verifyAccess("admin"),
    Validator.newAccountTourRules(),
    Validator.validateInput,
    TourController.createTours);
tourRouter.get("/allTours", TourController.getAllTours);
tourRouter.get("/:id", TourController.getOneTour);
tourRouter.delete("/:id", TourController.deleteOneTour);


export default tourRouter;