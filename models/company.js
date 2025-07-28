import { model, models, Schema } from "mongoose";

const companyScheme = new Schema(
  {
    email:{
      type: String,
      required : true,
    },
    password:{
      type : String,
      required :true,
    },
    company:{
      type:String,
      required : true,
    }
  },{
    collection : 'company',
    timestamps : true,
  }
)

export default models.company || model('company',companyScheme);

