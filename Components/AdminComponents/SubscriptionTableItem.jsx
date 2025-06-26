import React from "react";

const SubscriptionTableItem = ({ email, mongoId, date, deleteEmail }) => {
  const emailDate = new Date(date);

  return (
    <tr className="bg-white border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {email ? email : "No Email"}
      </th>
      <td className="px-6 py-4 hidden sm:block">{emailDate.toDateString()}</td>
      <td className="px-6 py-4 cursor-pointer">
        <div
          onClick={() => deleteEmail(mongoId)}
          className="w-7 h-7 flex justify-center items-center bg-gray-300 text-red-600 rounded-full font-bold transition-transform duration-300 hover:scale-110 text-base"
        >
          X
        </div>
      </td>
    </tr>
  );
};

export default SubscriptionTableItem;
