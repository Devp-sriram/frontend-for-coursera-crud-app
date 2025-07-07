import { model, models, Schema } from "mongoose";


const datascheme = new Schema(
  {
    firstname : {
      type:String
    },
    lastname :{
      type:String,
    },
    dep:{
      type:String,
    }
  }
)

const userscheme = new Schema(
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
    },
    data:[datascheme],
  },{
    collection : 'user',
    timestamps : true,
  }
)

export default  models.user || model('user',userscheme);

