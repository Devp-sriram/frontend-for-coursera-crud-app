import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/config/db';
import User from '@/models/user';

async function handler(req: NextRequest) {
    const { method } = req;
   
    switch (method) {
        case 'POST':
            try { 
                let body: { email?: string, password?: string } = {};
                try {
                    body = await req.json();
                } catch (err) {
                    return NextResponse.json(
                        { error: "Lack of user input" },
                        { status: 400 }
                    );
                }

                await connectDb(); // make sure this is a function that connects to your database
                const { email, password } = body; // assuming password is sent in the request body
                const user = await User.findOne({ email })

                if (!user) { return NextResponse.json({ error: 'this email not already registerted, go to signin' }, { status: 404 }) }

                let pw = user.password;
                // console.log(pw);
                // console.log(password);
                // console.log(user);
                if (password === pw) {
                    return NextResponse.json({user},{status:200});
                } else {
                    return NextResponse.json({user},{status:401})
                }
                // return NextResponse.json(user); // send the data as JSON
            } catch (error) {
                console.error('Error fetching users:', error);
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
            }
        default:
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }
}

export { handler as GET, handler as POST };