import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
  await connectDB();
};

loadDB();

export async function POST(request) {
  const formData = await request.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };

  await EmailModel.create(emailData);
  return NextResponse.json({ success: true, msg: "Email subscribed" });
}

export async function GET(request) {
  const emails = await EmailModel.find({});
  return NextResponse.json({emails});
}
