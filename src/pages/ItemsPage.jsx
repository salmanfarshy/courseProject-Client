import React, { useEffect, useState } from "react";
import Header from "../components/root_page/Header";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  useLoaderData,
  Link,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { getItems, getAllCollections } from "../apis/serverApis";
import HorizonLoading from "../components/HorizonLoading";

export async function loader({ params }) {
  //   console.log(params);
  const items = await getItems(params.id);
  const allCollections = await getAllCollections("all");

  return { items, allCollections };
}

function ItemsPage() {
  const { items, allCollections } = useLoaderData();
  // console.log(items?.data);
  const navigation = useNavigation();
  const navigate = useNavigate();
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

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen">
      {/* Loading  */}
      <HorizonLoading progress={progress} loading={navigation.state} />
      {/* Header */}
      <Header categories={allCollections.data} />
      <button className="flex items-center ms-8 mt-5" onClick={goBack}>
        <IoIosArrowRoundBack size={50} />
        Back
      </button>
      <div className="flex flex-wrap sm:flex-row flex-col items-center lg:gap-6 sm:gap-3 gap-4 mt-6 lg:mb-5 mb-3 -ms-3">
        {items?.data?.length ? (
          items?.data?.map((item) => (
            <div
              key={item?._id}
              className="rounded-lg overflow-hidden md:hover:shadow-md hover:shadow-sm bg-gray-800 md:ms-12 md:mb-5 mb-3 md:w-72 w-80"
            >
              <Link to={`/item/view/${item?._id}`}>
                <div className="px-6 py-4">
                  <div className="font-bold md:text-xl text-lg mb-2 text-white">
                    {item?.id}. {item?.name}
                  </div>
                  <p className="text-gray-300 text-base">
                    Author: <span className="font-semibold">{item.author}</span>
                    .
                  </p>
                </div>
                <div className="ms-5 mb-3 text-sm font-semibold text-gray-700 flex flex-wrap gap-1">
                  {item?.tags.map((tag) => (
                    <div className="inline-block bg-gray-200 rounded-full px-2 py-0.5 mr-3 mb-2">
                      #{tag}
                    </div>
                  ))}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center w-96 h-56 lg:ms-80 md:ms-40 text-2xl font-medium">
            No items
          </p>
        )}
      </div>

      <div className="flex justify-center items-center md:py-2 py-1 md:mt-2 mt-1 bg-gray-200">
        <p className="md:text-base text-sm md:font-semibold font-medium">
          &copy;Copyright Salman Farshi
        </p>
      </div>
    </div>
  );
}

export default ItemsPage;
