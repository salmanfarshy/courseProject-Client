import React, { useContext, useEffect, useState } from "react";
import Header from "../components/root_page/Header";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { getAllCollections } from "../apis/serverApis";
import HorizonLoading from "../components/HorizonLoading";
import { JiraToggle } from "../context/JiraContext";
import JiraPopup from "./JiraPopup";

export async function loader({ params }) {
  // console.log(params);
  const collections = await getAllCollections(params.id);
  const allCollections = await getAllCollections("all");

  return { collections, allCollections };
}

function CollectionsPage() {
  const { collections, allCollections } = useLoaderData();
  // console.log(collections);
  const { isJiraOpen, setIsJiraOpen } = useContext(JiraToggle);
  const user = JSON.parse(localStorage.getItem("User"));
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (navigation.state === "loading") {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return prevProgress;
          }
          return prevProgress + 10; // Increment progress
        });
      }, 100); // Update progress every 100ms

      return () => clearInterval(interval);
    }
  }, [navigation.state]);

  return (
    <div className="min-h-screen">
      {/* Loading  */}
      <HorizonLoading progress={progress} loading={navigation.state} />
      {/* JiraUI */}
      {isJiraOpen && <JiraPopup />}
      {/* Header */}
      <Header categories={allCollections.data} />
      <div className="flex flex-wrap sm:flex-row flex-col lg:gap-10 sm:gap-10 gap-4 lg:mb-5 mb-3 mt-8 mx-7">
        {collections?.data?.length ? (
          collections?.data.map((collection) => (
            <div
              key={collection?._id}
              className="overflow-hidden lg:w-[20rem] md:w-[19rem] w-full lg:min-h-96 md:min-h-80 flex flex-col items-center rounded-lg border-gray-700 bg-gray-800 hover:shadow-md mb-2"
            >
              <div className="w-full">
                <img
                  className="object-cover lg:h-44 md:h-40 h-36 w-full"
                  src={collection?.img?.path || "../../nocollection.jpg"}
                  alt="collection_img"
                />
              </div>
              <div className="flex flex-col justify-between md:px-8 px-12 md:pt-5 pt-3 leading-normal md:mb-7 mb-6">
                <Link
                  to={`/items/view/${collection?._id}`}
                  state={collection?._id}
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
                  <p className="text-gray-300 text-end lg:mt-4 mt-2">
                    Created by:{" "}
                    <span className="text-gray-200 font-medium">
                      {collection?.owner?.name}
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center w-96 h-56 lg:ms-80 md:ms-40 text-2xl font-medium">
            No collections
          </p>
        )}
      </div>
      <div className="flex md:flex-row flex-col md:gap-5 gap-2 justify-center items-center py-3 md:mt-2 mt-1 bg-gray-200">
        <p className="md:text-base text-sm md:font-semibold font-medium">
          &copy;Copyright Salman Farshi
        </p>
        {user && (
          <button
            onClick={() => setIsJiraOpen(true)}
            type="button"
            className="px-5 py-2 md:text-base text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-700"
          >
            Create Support Ticket
          </button>
        )}
      </div>
    </div>
  );
}

export default CollectionsPage;
