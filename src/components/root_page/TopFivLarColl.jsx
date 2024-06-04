import React from "react";
import { Link } from "react-router-dom";

function TopFivLarColl({ collections }) {
  return (
    <div className="flex flex-wrap md:flex-row flex-col lg:gap-16 md:gap-10 gap-4 lg:mb-5 mb-3 lg:ms-10 md:ms-6 md:me-0 me-10">
      {collections?.length ? (
        collections.map((collection) => (
          <div
            key={collection?._id}
            className="ms-5 overflow-hidden lg:w-[20rem] md:w-[19rem] w-full lg:min-h-96 md:min-h-80 flex flex-col items-center rounded-lg border-gray-700 bg-gray-800 hover:shadow-md mb-4"
          >
            <div className="w-full">
              <img
                className="object-cover lg:h-44 md:h-40 h-36 w-full"
                src={collection?.img?.path}
                alt="collection_img"
              />
            </div>
            <Link
              to={`/items/view/${collection?._id}`}
              className="flex flex-col justify-between md:px-8 px-12 md:pt-5 pt-3 leading-normal md:mb-5 mb-6"
            >
              <div className="flex items-center justify-between">
                <h5 className="lg:mb-2 mb-2 lg:text-2xl md:text-xl lg:font-bold md:font-semibold tracking-tight text-white">
                  {collection?.name}
                </h5>
                <h1 className="lg:mb-3 mb-2 lg:font-medium font-normal text-gray-200">
                  <span className="text-gray-300 lg:text-lg md:text-base">
                    Category:
                  </span>{" "}
                  {collection?.category}
                </h1>
              </div>

              <p className="font-normal lg:text-base text-sm text-gray-400">
                {collection?.description}
              </p>
              {/* <div className="flex gap-5 mt-5">
      <button className="w-20 py-1.5 bg-blue-700 rounded-md text-center text-white font-medium text-sm tracking-wider hover:scale-105">
        Edit
      </button>
      <button className="w-20 py-1.5 bg-blue-700 rounded-md text-center text-white font-medium text-sm tracking-wider hover:scale-105">
        Delete
      </button>
    </div> */}
            </Link>
          </div>
        ))
      ) : (
        <div className="w-screen text-center">No collections yet!</div>
      )}
    </div>
  );
}

export default TopFivLarColl;
