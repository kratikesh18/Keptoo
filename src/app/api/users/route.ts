import { User, UserType } from "@/models/user.model";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const connectionString = process.env.MONGODB_URI!;

  if (!connectionString) {
    return new Response("connection to db failed !string", { status: 500 });
  }

  await mongoose.connect(connectionString);

  let users = [];
  if (url.searchParams.get("ids")) {
    const emails = url.searchParams.getAll("ids");
    users = await User.find({ email: emails });
  }

  if (url.searchParams.has("search")) {
    const searchPhrase = url.searchParams.get("search");
    const searchRegEx = `.*${searchPhrase}.*`;
    users = await User.find({
      $or: [
        { name: { $regex: searchRegEx } },
        { email: { $regex: searchRegEx } },
      ],
    });
  }

  return Response.json(
    users.map((u: UserType) => ({
      id: u.email,
      name: u.name,
      image: u.image,
    }))
  );
}
