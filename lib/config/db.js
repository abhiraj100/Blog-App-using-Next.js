import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://abhiraj100right:RAMBHAGWAAN@cluster0.ifd3sbz.mongodb.net/blog-app"
  );
  console.log("Database connected");
};
