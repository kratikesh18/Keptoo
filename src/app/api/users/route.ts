import { User } from "@/models/user.model";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  const url = new URL(req.url);

  if (!url.searchParams.has("ids")) {
    return Response.json([]);
  }

  const emails = url.searchParams.getAll("ids");
  await mongoose.connect(process.env.MONGODB_URI!);
  const users = await User.find({ email: emails });

  return Response.json(
    users.map((u) => ({ id: u.email, name: u.name, image: u.image }))
  );
  
}
