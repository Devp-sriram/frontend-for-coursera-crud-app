import User from '../models/user.js'


export default async function CheckUser(email) {
    try {
        const user = await User.findOne({ email : email });
        console.log('User'+user);
        if (user) {
            return user;
        }
        return false;
    } catch(error){
        return "user not found", error.message
    }
}
