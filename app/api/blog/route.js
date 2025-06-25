import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";

const loadDB = async () => {
  await connectDB();
};

loadDB();

export async function GET(request) {
  //   console.log("Blog GET Hit");
  return NextResponse.json({
    msg: "API Working",
  });
}

export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get("authorImg")}`,
  };

  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added" });
}

// import { connectDB } from "@/lib/config/db";
// const { NextResponse } = require("next/server");
// import { writeFile } from "fs/promises";
// import path from "path";

// const loadDB = async () => {
//   await connectDB();
// };

// loadDB();

// export async function GET(request) {
//   //   console.log("Blog GET Hit");
//   return NextResponse.json({
//     msg: "API Working",
//   });
// }

// export async function POST(request) {
//   try {
//     // CHANGE 1: Add content-type check
//     const contentType = request.headers.get("content-type");
//     console.log("Content-Type:", contentType);

//     // CHANGE 2: Check if the request actually contains multipart/form-data
//     if (!contentType || !contentType.includes("multipart/form-data")) {
//       return NextResponse.json(
//         { error: "Content-Type must be multipart/form-data" },
//         { status: 400 }
//       );
//     }

//     // CHANGE 3: Add error handling around formData parsing
//     let formData;
//     try {
//       formData = await request.formData();
//     } catch (error) {
//       console.error("FormData parsing error:", error);
//       return NextResponse.json(
//         {
//           error:
//             "Failed to parse form data. Make sure you're sending multipart/form-data.",
//         },
//         { status: 400 }
//       );
//     }

//     const timestamp = Date.now();

//     // CHANGE 4: Add validation for image field
//     const image = formData.get("image");
//     if (!image) {
//       return NextResponse.json(
//         {
//           error: "No image file provided. Make sure the field name is 'image'.",
//         },
//         { status: 400 }
//       );
//     }

//     // CHANGE 5: Add validation for file type
//     if (!(image instanceof File)) {
//       return NextResponse.json(
//         { error: "Invalid file format" },
//         { status: 400 }
//       );
//     }

//     // CHANGE 6: Add file size validation (optional)
//     const maxSize = 5 * 1024 * 1024; // 5MB
//     if (image.size > maxSize) {
//       return NextResponse.json(
//         { error: "File size too large. Maximum size is 5MB." },
//         { status: 400 }
//       );
//     }

//     // CHANGE 7: Add file type validation (optional)
//     const allowedTypes = [
//       "image/jpeg",
//       "image/jpg",
//       "image/png",
//       "image/gif",
//       "image/webp",
//     ];
//     if (!allowedTypes.includes(image.type)) {
//       return NextResponse.json(
//         {
//           error:
//             "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
//         },
//         { status: 400 }
//       );
//     }

//     // Process the file
//     const imageByteData = await image.arrayBuffer();
//     const buffer = Buffer.from(imageByteData);

//     // CHANGE 8: Use path.join for better path handling
//     const fileName = `${timestamp}_${image.name}`;
//     const filePath = path.join(process.cwd(), "public", fileName);

//     // CHANGE 9: Add error handling for file writing
//     try {
//       await writeFile(filePath, buffer);
//     } catch (error) {
//       console.error("File write error:", error);
//       return NextResponse.json(
//         { error: "Failed to save file" },
//         { status: 500 }
//       );
//     }

//     const imgUrl = `/${fileName}`;
//     console.log("Image saved successfully:", imgUrl);

//     return NextResponse.json({
//       success: true,
//       imgUrl,
//       message: "Image uploaded successfully",
//     });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
