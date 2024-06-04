import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProfileDrop({ userName }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const Signout = async () => {
    const user = localStorage.removeItem("User");
    const token = localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="absolute -mt-[0.8rem]">
      <button
        className="flex items-center text-sm pe-1 font-bold rounded-full hover:text-blue-500 md:me-0 text-gray-600"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 me-2 rounded-full"
          src="../../noimage.png"
          alt="user photo"
        />
        {userName}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* <!-- Dropdown menu --> */}
      {isOpen && (
        <div className="divide-y divide-gray-400 rounded-lg shadow w-44 bg-[#CAF4FF]">
          <ul className="py-2 text-sm text-indigo-500">
            <li>
              <Link
                to="/user/dashboard"
                className="block px-4 py-2 hover:bg-white text-indigo-500"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/user/colletions"
                className="block px-4 py-2 hover:bg-white text-indigo-500"
              >
                Dashboard
              </Link>
            </li>
          </ul>
          <div className="py-2">
            <button
              onClick={Signout}
              className="block px-4 py-2 text-sm w-full text-start hover:bg-white text-indigo-500"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDrop;
