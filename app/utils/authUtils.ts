import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv'
dotenv.config()



export async function fetchData(email : string , password : string){
  try{
      const response : AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,{email,password});
      return response
    }catch(error: unknown){
      console.log(error);
    }
}
