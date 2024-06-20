import React from "react";
import { Link } from "react-router-dom";

function TopFivLatItm({ items }) {
  return (
    <div className="flex flex-wrap mb-3 me-5 md:flex-row flex-col items-center">
      {items?.length ? (
        items.map((item) => (
          <Link
            to={`/item/view/${item?._id}`}
            key={item?._id}
            className="rounded-lg overflow-hidden md:hover:shadow-md hover:shadow-sm bg-gray-800 md:ms-12 md:mb-5 mb-3 md:w-72 w-80"
          >
            <div className="px-6 py-4">
              <div className="font-bold md:text-xl text-lg mb-2 text-white">
                {item?.id}. {item?.name}
              </div>
              <div className="text-gray-300 text-base">
                Author: <span className="font-semibold">{item?.author}</span>.
              </div>
            </div>
            <div className="ms-5 mb-3 text-sm font-semibold text-gray-700 flex flex-wrap gap-1">
              {item?.tags.map((tag) => (
                <div
                  key={tag}
                  className="inline-block bg-gray-200 rounded-full px-2 py-0.5 mr-3 mb-2"
                >
                  #{tag}
                </div>
              ))}
            </div>
          </Link>
        ))
      ) : (
        <div className="w-screen text-center">No items yet!</div>
      )}
    </div>
  );
}

export default TopFivLatItm;
