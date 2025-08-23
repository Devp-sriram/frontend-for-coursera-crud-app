import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/config/db';
import Company from '@/models/company';
import Employee from '@/models/employee';
import addEmployee from '../../../controllers/addEmployee'
import { ObjectId } from 'mongodb';
import employee from '@/models/employee';


async function handler(req: NextRequest) {
  const { method } = req; 
  const url = new URL(req.url);

  switch (method) {
    case 'GET':
      try{
        // const url = new URL(req.url);
        const id = url.searchParams.get('id');
        await connectDb();
        const res = await Employee.find({companyId: new ObjectId(id), isDeleted: 0});
        // console.log(res)
        return NextResponse.json({res},{status:200})
      }catch(err){
        console.error('Error fetching users:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      } 
      break

    case 'POST':
      try {
        // const url = new URL(req.url);
        const id = url.searchParams.get('id');
        let body: { firstname?:string , lastname?:string , role?: string } = {};

        if(!id){ 
          return NextResponse.json(
            {error:'please login'},
            {status:401}
          )
        }; 
        console.log(id)
        const companyId = ObjectId.createFromHexString(id);

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
        const employeeData = {companyId , ...body}

        await connectDb(); // make sure this is a function that connects to your database
        const res = await addEmployee(employeeData)
        console.log(res)
        if(res?.success){
          return NextResponse.json({    
            message: `Employee ${body.firstname} ${body.lastname} added successfully`,
            employee: { firstname : body.firstname , lastname : body.lastname , role : body.role },
            allEmployees : res.user,
          },{status:201})
        }
        return NextResponse.json({ error:`error adding employee`},{status:400}); // send the data as JSON
      } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
      break;

    case 'PUT':

      try{
        // const url = new URL(req.url);
        const id = url.searchParams.get('id');

        let body: { firstname?:string , lastname?:string , role?: string } = {};

        body = await req.json();    
        if(!(body.firstname , body.lastname)){
          return NextResponse.json(
            { error: "please put the username , password"},
            { status: 400 }
          )
        }

        console.log(' body '+body)
        console.log(' id '+ id)
        const result = await Employee.updateOne(
          {_id: id},
          {$set : body}
        )
        if(result.modifiedCount === 0) {
          return NextResponse.json({ error: "Employee not found or no changes made" },{status:400});
        }
        return NextResponse.json({ message: "Employee found and changes made" },{status:200});
      }catch (error) {
        console.log({ message: "Error updating employee", error: error.message });
        return NextResponse.json({ message: "Error updating employee" },{status:400});

      }
      break

    case 'DELETE':

      try{
        const id = url.searchParams.get('id');
        
        console.log(' id '+ new ObjectId(id))
        const result = await Employee.updateOne(
          { _id: new ObjectId(id)},
          { $set: { isDeleted: 1 } }
        );
        if(result.modifiedCount === 0) {
          return NextResponse.json({ error: "Employee not found or not deleted" },{status:400});
        }
        return NextResponse.json({ message: "Employee deleted" },{status:200});
      }catch (error) {
        console.log({ message: "Error deleteing employee", error: error.message });
        return NextResponse.json({ message: "Error deleteing employee" },{status:400});

      }
      break  

    default:
      return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}

export { handler as GET, handler as POST , handler as PUT , handler as DELETE};
