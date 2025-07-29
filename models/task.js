import { model, models, Schema } from "mongoose";


const taskScheme = new Schema(
  {
    name : {
      type:String
    },
    assigner :{
      type:String,
    },
    assignee:{
      type:String,
    },
    deadline:{
      type:Number,
    },
    lastUpdate:{
      type: Date
    },
    status:{
      type:Number
    }
  }
)

export default  models.employee || model('employee',employeeScheme);

