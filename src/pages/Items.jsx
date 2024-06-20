import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getItems, deleteItem } from "../apis/serverApis";
import LoadingPage from "../components/LoadingPage";
import UnsuccessToast from "../components/toast/UunsuccessToast";
import SuccessToast from "../components/toast/SuccessToast";
import HorizonLoading from "../components/HorizonLoading";

function Items() {
  const location = useLocation();
  const id = location.state;
  // console.log(id);
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const value = localStorage.getItem("User");
  const User = JSON.parse(value);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState("unknown");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const allItems = await getItems(id);
      // console.log(allItems.data);

      setItems(allItems.data);
    };
    fetchItems();
  }, []);

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

  const deleteHandle = async () => {
    setIsLoading(true);
    const id = { deleteId };
    const res = await deleteItem(id);
    console.log(res.data);
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
            message="Update successfully."
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

      {User?.userId !== id && (
        <button className="flex items-center" onClick={goBack}>
          <IoIosArrowRoundBack size={50} />
          Back
        </button>
      )}
      <p className="lg:text-4xl md:text-3xl text-2xl text-gray-600 font-medium">
        Items
      </p>
      {User?.userId !== id && (
        <Link
          to="/user/items/new"
          state={id}
          type="button"
          className="text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-32"
        >
          Create new
        </Link>
      )}

      <div className="flex flex-wrap sm:flex-row flex-col lg:gap-6 sm:gap-3 gap-4 lg:mb-5 mb-3 -ms-3">
        {items?.length ? (
          items.map((item) => (
            <div
              key={item?._id}
              className="rounded-lg overflow-hidden md:hover:shadow-md hover:shadow-sm bg-gray-800 md:ms-12 md:mb-5 mb-3 md:w-72 w-80"
            >
              <Link to={`/user/items/${item?._id}`}>
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
                    <div
                      key={tag}
                      className="inline-block bg-gray-200 rounded-full px-2 py-0.5 mr-3 mb-2"
                    >
                      #{tag}
                    </div>
                  ))}
                </div>
              </Link>
              <div className="flex gap-5 md:ml-24 ml-28 mb-4 mt-6">
                <Link
                  to={`/user/items/edit/${item?._id}`}
                  className="text-white text-center  bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-xs px-6 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Edit
                </Link>
                <button
                  className="text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-xs px-6 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => {
                    setDeletePopup(true);
                    setDeleteId(item?._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center w-96 h-56 lg:ms-80 md:ms-40 text-2xl font-medium">
            No items
          </p>
        )}
      </div>
    </div>
  );
}

export default Items;
