import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { getCollections, deleteCollection } from "../apis/serverApis";
import LoadingPage from "../components/LoadingPage";
import UnsuccessToast from "../components/toast/UunsuccessToast";
import SuccessToast from "../components/toast/SuccessToast";
import HorizonLoading from "../components/HorizonLoading";

export async function loader() {
  const collections = await getCollections();
  return collections;
}

function Collections() {
  const collections = useLoaderData().data;
  // console.log(collections);
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [imgId, setImgId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState("unknown");

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

  const deleteHandle = async () => {
    setIsLoading(true);
    const credentials = { deleteId, imgId };
    const res = await deleteCollection(credentials);
    // console.log(res.data);
    setIsLoading(false);
    setShowToast(res.data);
  };
  return (
    <div className="flex flex-col sm:mt-16 mt-10 sm:ms-64 ms-5 me-5 sm:gap-10 gap-4">
      {/* Loading  */}
      <HorizonLoading progress={progress} loading={navigation.state} />
      {isLoading && <LoadingPage />}
      {showToast === "unsuccess" ? (
        <UnsuccessToast
          setShowToast={setShowToast}
          message="Something wrong."
        />
      ) : (
        showToast === "success" && (
          <SuccessToast
            setShowToast={setShowToast}
            message="Delete successfully."
          />
        )
      )}
      {deletePopup && (
        <div className="fixed lg:right-[30rem] md:right-[15rem] right-[5rem] top-60 shadow-2xl bg-gray-300 rounded-md p-8 z-20">
          <p className="mb-12 text-center text-lg">Are you sure to delete?</p>
          <button
            className="px-5 py-1 text-white font-medium rounded-sm bg-blue-500 me-10 hover:ring-1"
            onClick={() => {
              setDeletePopup(false);
              deleteHandle();
            }}
          >
            Sure
          </button>
          <button
            className="px-5 py-1 text-white font-medium rounded-sm bg-blue-500 ms-10 hover:ring-1"
            onClick={() => {
              setDeletePopup(false);
              setDeleteId("");
              setImgId("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <p className="lg:text-4xl md:text-3xl text-2xl text-gray-600 font-medium">
        Collections
      </p>
      <Link
        to="/user/colletions/new"
        type="button"
        className="text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-32"
      >
        Create new
      </Link>
      <div className="flex flex-wrap sm:flex-row flex-col lg:gap-16 sm:gap-10 gap-4 lg:mb-5 mb-3">
        {collections?.length ? (
          collections.map((collection) => (
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
                <Link to="/user/items" state={collection?._id}>
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
                <div className="flex gap-5 mt-2">
                  <Link
                    to={`/user/colletions/edit/${collection?._id}`}
                    className="w-20 py-1.5 bg-blue-700 rounded-md text-center text-white font-medium text-sm tracking-wider hover:scale-105"
                  >
                    Edit
                  </Link>
                  <button
                    className="w-20 py-1.5 bg-blue-700 rounded-md text-center text-white font-medium text-sm tracking-wider hover:scale-105 z-30"
                    onClick={() => {
                      setDeletePopup(true);
                      setDeleteId(collection?._id);
                      setImgId(collection?.img?.filename);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center w-96 h-56 lg:ms-80 md:ms-40 text-2xl font-medium">
            No collections
          </p>
        )}
      </div>
    </div>
  );
}

export default Collections;
