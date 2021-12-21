
const verifyAccess=(requiredRole)=>{

    return async(req,res,next)=>{
  // try and catch means try it if there errror it catch it and bring it
        try{
         const {role}=req.user;
         if(requiredRole!=role){
             return res.status(401).json({error:"Unauthorised! You don't have access to this Api"});
         }
         return next();

        }

        catch(err){
             console.log(err);
        }
    };

};
export default verifyAccess;