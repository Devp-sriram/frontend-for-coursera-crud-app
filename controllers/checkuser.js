import dbConnect from "../config/db.ts";
import Company from "@/models/company";

export default async function checkUser(email) {
  await dbConnect();
  return Company.findOne({ email }).lean();
}
