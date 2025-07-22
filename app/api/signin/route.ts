import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/config/db';
import User from '@/models/user';
import CheckUser from '../../../controllers/checkuser.js'

async function handler(req: NextRequest) {
    const { method } = req;
    let body;

    switch (method) {
        case 'POST':
            try { 
                try {
                    body = await req.json();
                    console.log(body)
                } catch (err) {
                    return NextResponse.json(
                        { error: "Lack of user input" },
                        { status: 400 }
                    );
                }

                await connectDb(); // make sure this is a function that connects to your database
                const { email , password , company } = body; // assuming password is sent in the request body

                if(await CheckUser(email)){
                     // console.log('fn'+ await CheckUser(email))
                    return NextResponse.json({ error:'user aldreay exist'},{status:400});
                }
                try{
                  const newUser = new User({ email , password , company });
                  await newUser.save();
                  
                  if(newUser){
                    return NextResponse.json({error:'user created'},{status:200})
                  }else{
                    return NextResponse.json({error:'user not created'},{status:401})
                  }
                }catch(err){
                  console.log(err)
                }
            }catch (error) {
                console.error('Error fetching users:', error);
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
            }
        default:
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }
}

export { handler as GET, handler as POST };
