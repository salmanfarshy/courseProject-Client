import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdLegendToggle } from "react-icons/md";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import ProfileDrop from "../ProfileDrop";

function Header({ categories }) {
  const value = localStorage.getItem("User");
  const User = JSON.parse(value);
  // console.log(User);
  const [isToggle, setIsToggle] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);

  return (
    <>
      <SideBar
        categories={categories}
        isToggle={isToggle}
        isDropDown={isDropDown}
        setIsToggle={setIsToggle}
        setIsDropDown={setIsDropDown}
      />
      <header className=" bg-[#CAF4FF] lg:h-20 md:h-16 h-24 mb-3 md:mb-5 lg:mb-0">
        {/* toogle button */}
        <div
          className="absolute md:hidden mt-3 ml-3 border-2 
             rounded-md hover:shadow-sm cursor-pointer border-indigo-500"
          // role="button"
          onClick={() => setIsToggle(true)}
        >
          <MdLegendToggle className="text-3xl text-indigo-500" />

          {/* <RxCross2 className="text-3xl text-gray-500" /> */}
        </div>

        <div className="flex justify-between items-center h-full me-10">
          {/* logo and search bar */}
          <div className="lg:ml-16 md:ml-12 flex md:flex-row md:items-center flex-col justify-center items-center lg:gap-5 md:gap-3 gap-1 w-full">
            <div>
              <Link
                className=" text-indigo-500 font-medium lg:text-2xl md:text-xl text-xl italic select-none md:select-text"
                to="/"
              >
                Collections
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="lg:w-96 md:w-72 w-60 lg:h-12 md:h-10 h-10 flex items-center">
                <input
                  className="w-full h-full lg:text-base text-sm text-gray-900 lg:rounded-s-xl rounded-s-lg border-2 border-gray-300 focus:ring-blue-400 focus:border-blue-400 outline-none lg:ps-7 md:ps-5 ps-5 lg:pe-5 md:pe-3 pe-3"
                  type="search"
                  name="rootSearch"
                  placeholder="Search items.."
                />

                <div className="h-full flex items-center bg-gray-50 md:border-2 border-2 border-s-0 border-gray-300">
                  <IoSearch className="lg:text-2xl text-xl text-gray-400 mx-2" />
                </div>
              </div>
              <div className="md:hidden text-base text-indigo-500 font-medium">
                {User !== null ? (
                  <div className="ml-5 z-30">
                    <ProfileDrop userName={User?.name} />
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="lg:ml-10 text-base hover:underline hover:translate-y-[0.04rem]"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* button and profile */}
          <div className="hidden md:flex lg:flex justify-center items-center shrink lg:gap-8 md:gap-6 lg:mr-52 md:mr-24 lg:ml-5 md:ml-4 text-indigo-400 font-medium lg:text-lg md:text-base">
            <div
              className=" hover:text-indigo-500 cursor-pointer"
              onMouseOver={() => setIsDropDown(true)}
            >
              Catagory
              <div
                className={`lg:w-40 lg:mt-6 md:w-32 md:mt-5 ${
                  isDropDown ? "d-block" : "hidden"
                } absolute lg:right-[25rem] md:right-[19rem] bg-[#CAF4FF] flex flex-col lg:gap-3 md:gap-1 font-medium lg:text-base md:text-sm select-none z-30`}
                onMouseOver={() => setIsDropDown(true)}
                onMouseLeave={() => setIsDropDown(false)}
              >
                {categories?.length &&
                  categories.map((category) => (
                    <Link
                      key={category?._id}
                      to={`/colletions/view/${category?.category}`}
                      className="px-6 lg:py-2 md:py-2 hover:bg-gray-50 w-full hover:shadow-sm"
                    >
                      {category?.category}
                    </Link>
                  ))}
              </div>
            </div>

            <Link
              to="/colletions/view/all"
              role="button"
              className=" hover:text-indigo-500"
            >
              Collections
            </Link>
            <Link
              to="/items/view/all"
              role="button"
              className=" hover:text-indigo-500"
            >
              Items
            </Link>
            {User !== null ? (
              <div className="ml-5 z-30">
                <ProfileDrop userName={User?.name} />
              </div>
            ) : (
              <Link
                to="/login"
                className="lg:ml-10 text-base hover:underline hover:translate-y-[0.04rem]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
