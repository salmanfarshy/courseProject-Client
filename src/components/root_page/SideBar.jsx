import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

function SideBar({
  isToggle,
  isDropDown,
  setIsDropDown,
  setIsToggle,
  categories,
}) {
  return (
    <div
      className={`overflow-hidden ${
        !isToggle ? "-w-32" : "w-32"
      } z-20 h-screen fixed shadow-xl bg-[#CAF4FF] md:hidden`}
    >
      <div
        className={`fixed md:hidden mt-3 ml-3 border-2 
          ${
            !isToggle ? "hidden" : "block"
          } border-gray-400 rounded-md hover:shadow-sm cursor-pointer`}
        // role="button"
        onClick={() => setIsToggle(false)}
      >
        <RxCross2 className={`text-3xl text-gray-500`} />
      </div>

      <div
        className={`${
          !isToggle ? "hidden" : "flex"
        } flex-col items-start ml-5 mt-20 gap-5 text-gray-500 font-medium text-base select-none`}
      >
        <div
          role="button"
          className="hover:shadow-sm hover:text-indigo-500"
          onMouseOver={() => setIsDropDown(true)}
        >
          Catagory
          <div
            className={`w-36 ml-6 ${
              isDropDown ? "d-block" : "hidden"
            } fixed bg-[#CAF4FF] top-[4.8rem] shadow-lg left-24 flex flex-col gap-1 font-medium text-sm select-none`}
            onMouseOver={() => setIsDropDown(true)}
            onMouseLeave={() => setIsDropDown(false)}
          >
            {categories?.length &&
              categories.map((category) => (
                <Link
                  key={category?._id}
                  to={`/colletions/view/${category?.category}`}
                  className="px-4 py-1 md:py-2 hover:bg-gray-50 w-full hover:shadow-sm"
                >
                  {category?.category}
                </Link>
              ))}
          </div>
        </div>
        <Link
          to="/colletions/view/all"
          className="hover:shadow-sm hover:text-indigo-500"
        >
          Collections
        </Link>
        <Link
          to="/items/view/all"
          className="hover:shadow-sm hover:text-indigo-500"
        >
          Items
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
