import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/config/db';
import User from '@/models/user';
import addEmployee from '../../../controllers/addEmployee'
import { ObjectId } from 'mongodb';


async function handler(req: NextRequest) {
    const { method } = req; 
    switch (method) {

        case 'POST':
            try {
                const url = new URL(req.url);
                const id = url.searchParams.get('id');
                let body: { firstname:string , lastname:string , dep : string } = {};
          
                if(!id){ res.status(401).send('please login')}; 
                const userId = ObjectId.createFromHexString(id);

                try {
                    body = await req.json();    
                    if(!(body.firstname , body.lastname)){
                      return NextResponse.json(
                        { error: "please put the username , password"},
                        { status: 400 }
                    )}
                } catch (err) {
                    return NextResponse.json(
                        { error: "Lack of user input" },
                        { status: 400 }
                    );
                }

                await connectDb(); // make sure this is a function that connects to your database
                const res = await addEmployee(userId,{ firstname : body.firstname , lastname : body.lastname , dep : body.dep })
                console.log(res)
                if(res?.success){
                    return NextResponse.json({    
                            message: `Employee ${body.firstname} ${body.lastname} added successfully`,
                            employee: { firstname : body.firstname , lastname : body.lastname , dep : body.dep },
                            allEmployees : res.data,
                            },{status:201})
                }
                return NextResponse.json({ error:`error adding employee`},{status:400}); // send the data as JSON
            } catch (error) {
                console.error('Error fetching users:', error);
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
            }
            break;

        default:
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }
}

export { handler as GET, handler as POST };
