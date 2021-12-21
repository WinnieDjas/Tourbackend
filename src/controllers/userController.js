import UserInfos from "../models/user";
import bcrypt from "bcrypt";
import TokenAuth from "../helpers/tokenAuth"

class UserController{
      
    //create user in db
    /** 
        * Generate
        * @static
        * @param {req,res} Req object
        * @memberof UserController
        * @return {String} Response
        */

    static async createUser(req,res){

       const hashPassword= bcrypt.hashSync(req.body.password,10)
       req.body.password =hashPassword;
        const user= await UserInfos.create(req.body); //this function return generated data //req.body ,request data from body in postman

        if(!user){
            return res.status(404).json({error:"user not registered"})
        } 

        return res
        .status(200)
        .json({message:"User created successfully" , data: user});

    }
    //get all users
    static async getAllUsers(req,res){ //
        const users= await UserInfos.find(); // return generated data

        if(!users){
            return res.status(404).json({error:"no users registered"})
        }

        return res
        .status(200)
        .json({message:"Successfully retrieved users" , data: users});

    }
     //getting a specific user
    static async getOneUser(req,res){

      const user= await UserInfos.findById(req.params.id); //this functions return the data yabonye according to the id given
       
      if(!user){
          return res.status(404).json({error:"user not found"});
      }
      return res
      .status(200)
      .json({message:"user found successful", data:user})

    }
    // delete a user
    static async deleteOneUser(req,res){

        const user= await UserInfos.findByIdAndDelete(req.params.id); //this functions return the data yabonye according to the id given
         
        if(!user){
            return res.status(404).json({error:"user not found"});
        }
        return res
        .status(200)
        .json({message:"user deleted successful", data:user})
  
      }
      // login function
      static async userLogin(req,res){
          const user = await UserInfos.findOne({email:req.body.email});

          if(!user){
              return res.status(404).json({error:"user not Found! Kindly register first"}) // f(x) which checks/or compare  data hashed  if the writen psw and the hashed psw are the same
          }
          if(bcrypt.compareSync(req.body.password,user.password)){
            user.password=null;
            const token = TokenAuth.tokenGenerator({user:user});
            return res.status(200).json({message:"Succefully logged in", token: token});
            
          }
          return res.status(400).json({error:"Password is wrong"})
      }

}
export default UserController;

// controller is the one directlly connected on database
// controller is where all the action are done
//is a class beacuse its hold different function