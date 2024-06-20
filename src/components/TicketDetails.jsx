import React from "react";

function TicketDetails({ tickets }) {
  return (
    <>
      {tickets?.map((ticket) => (
        <tr key={ticket?.link} className="border-b bg-gray-800 border-gray-700">
          <th
            scope="row"
            className="px-6 py-4 font-medium whitespace-nowrap text-gray-200"
          >
            <p className="w-48 truncate">{ticket?.summary}</p>
          </th>
          <td
            className={`px-6 py-4 ${
              (ticket?.status === "To Do" && "text-green-200") ||
              (ticket?.status === "In Progress" && "text-blue-300") ||
              (ticket?.status === "Done" && "text-green-400")
            }`}
          >
            {" "}
            {ticket?.status}
          </td>
          <td className="px-6 py-4 text-gray-300">
            {" "}
            <a
              href={ticket?.link}
              title="Jira Ticket"
              target="blank"
              className="text-blue-400 hover:text-blue-300"
            >
              Link
            </a>
          </td>
        </tr>
      ))}
    </>
  );
}

export default TicketDetails;
