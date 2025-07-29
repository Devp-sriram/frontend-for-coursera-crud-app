import { model, models, Schema } from "mongoose";


const employeeScheme = new Schema(
  {
    companyId:{
      type:String
    },
    firstname : {
      type:String
    },
    lastname :{
      type:String,
    },
    // email:{
    //   type:String,
    // },  
    // Phone:{
    //   type:String
    // },
    role:{
      type:String,
    },
    // salary:{
    //   type:Number,
    // },
    // status:{
    //   type:Number
    // },
    // doj:{
    //   type: Date
    // },
    // doe:{
    //   type: Date
    // }
  }
)

export default  models.employee || model('employee',employeeScheme);

