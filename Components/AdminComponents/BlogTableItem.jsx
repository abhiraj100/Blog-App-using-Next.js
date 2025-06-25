import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const BlogTableItem = ({
  authorImg,
  title,
  author,
  date,
  deleteBlog,
  mongoId,
}) => {
  const blogDate = new Date(date);
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={authorImg ? authorImg : assets.profile_icon}
          alt=""
          width={40}
          height={40}
        />
        <p>{author ? author : "No author"}</p>
      </th>
      <td className="px-6 py-4">{title ? title : "No Title"}</td>
      <td className="px-6 py-4">{blogDate.toDateString()}</td>
      <td
        onClick={() => deleteBlog(mongoId)}
        className="px-6 py-4 cursor-pointer"
      >
        <div className="w-7 h-7 flex justify-center items-center bg-gray-300 text-red-600 rounded-full font-bold transition-transform duration-300 hover:scale-110 text-base">
          X
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
