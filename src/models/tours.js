import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(  // Schema is a format or a structure of our model, it will generate our model in db
     {
        title:{
           type:String,
           required:true,
        },
       description:String,
       seats:{
          type:Number,
          required:true,
       },
       available:{
          type:Number,
          required:true,
       },
       image:[{
          type:String,
       },

       ],
       dateScheduled:{
           type:Date,
           required:true,
       },
       dueDate:{
         type:Date,
         required:true,
     },
       phone:String,
       price:{
         type:String,
         required:true,
     },
       
       
       tripDescription:String,
         

    },
       {
           timestamps: true,   
       }

    

);

const tour = mongoose.model('Tour',tourSchema)

export default tour;
