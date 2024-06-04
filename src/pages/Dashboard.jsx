import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdCollectionsBookmark } from "react-icons/md";
import { RiAlignItemRightLine } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import HorizonLoading from "../components/HorizonLoading";

function Dashboard() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const value = localStorage.getItem("User");
  const User = JSON.parse(value);
  const [isOpen, setIsOpen] = useState(false);

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

  const Signout = async () => {
    const user = localStorage.removeItem("User");
    const token = localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      {/* Loading  */}
      <HorizonLoading progress={progress} loading={navigation.state} />
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 h-12 w-12"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-52 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full p-6 overflow-y-auto bg-[rgb(202,244,255)]">
          <Link
            to="/"
            className="text-xl text-indigo-500 font-medium ml-5 mt-5 select-none"
          >
            Home
          </Link>

          <ul className="space-y-4 font-medium mt-3 ml-3">
            <li className="mb-8">
              <button
                type="button"
                className="sm:hidden inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 h-12 w-12"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
            </li>
            <li>
              <Link
                to="/user/dashboard"
                className="flex items-center p-2 text-black rounded-lg hover:bg-white group"
              >
                <CgProfile size={22} color="black" />
                <span className="ms-3">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/user/colletions"
                className="flex items-center p-2 text-black rounded-lg hover:bg-white group"
              >
                <MdCollectionsBookmark size={22} color="black" />
                <span className="ms-3">Collections</span>
              </Link>
            </li>
            <li>
              <Link
                to="/user/items"
                state={User?.userId}
                className="flex items-center p-2 text-black rounded-lg hover:bg-white group"
              >
                <RiAlignItemRightLine size={22} color="black" />
                <span className="ms-3">Items</span>
              </Link>
            </li>
            <li>
              <button
                onClick={Signout}
                className="flex items-center p-2 text-black rounded-lg hover:bg-white group"
              >
                <GoSignOut size={22} color="black" />
                <span className="ms-3">Sign out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
