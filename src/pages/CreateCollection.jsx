import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useNavigation } from "react-router-dom";
import { newCollection } from "../apis/serverApis";
import LoadingPage from "../components/LoadingPage";
import UnsuccessToast from "../components/toast/UunsuccessToast";
import SuccessToast from "../components/toast/SuccessToast";
import HorizonLoading from "../components/HorizonLoading";

function CreateCollection() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
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

  const goBack = () => {
    navigate(-1);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createCollection = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const value = localStorage.getItem("User");
    const User = JSON.parse(value);

    const formData = new FormData(e.target);
    formData.append("owner", User?.userId);
    const credentials = Object.fromEntries(formData);

    const res = await newCollection(credentials);
    setIsLoading(false);
    setShowToast(res.data);
    if (res.data === "success") {
      e.target.reset();
      setImageSrc(null);
    }

    // console.log(res.data);
  };

  return (
    <div className="flex flex-col md:ms-56 sm:ms-56 ms-3 mb-36 sm:pt-12 pt-8 gap-10 pb-12">
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
            message="Create successfully."
          />
        )
      )}
      <button className="flex items-center lg:ps-16 ps-3" onClick={goBack}>
        <IoIosArrowRoundBack size={50} />
        Back
      </button>
      <form
        onSubmit={createCollection}
        className="lg:w-[40rem] sm:w-[30rem] w-[25rem] lg:ps-20 ps-3 lg:mb-20 md:mb-28 mb-32"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="category"
            id="category"
            className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="category"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Catagory
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            type="text"
            name="description"
            id="description"
            className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>
        <div className="flex flex-col md:gap-16">
          <div className="relative z-0 w-full h-20 mb-5 group">
            {imageSrc && (
              <img
                src={imageSrc}
                alt="Uploaded"
                className="mt-4 ms-6 mb-2 lg:w-40 sm:w-36 w-28"
              />
            )}
            <label className="ms-4 h-20 w-44 cursor-pointer flex items-center gap-1 justify-center border-2 rounded-2xl p-2 text-xl text-gray-600 bg-gray-50">
              <input
                type="file"
                name="image"
                className="hidden"
                onChange={handleImageUpload}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload
            </label>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 sm:w-auto px-5 py-2.5 mt-5 ms-5 sm:me-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCollection;
