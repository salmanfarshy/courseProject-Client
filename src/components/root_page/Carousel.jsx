import React, { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

function Carousel({ imgs }) {
  const [imageIdx, setImageIdx] = useState(0);
  const Urls = imgs.map((img) => img?.img?.path);
  // console.log(Urls);

  const leftArrowImage = () => {
    if (imageIdx === 0) {
      setImageIdx(Urls.length - 1);
      return;
    }
    setImageIdx(imageIdx - 1);
  };

  const rightArrowImage = () => {
    if (imageIdx === Urls.length - 1) {
      setImageIdx(0);
      return;
    }
    setImageIdx(imageIdx + 1);
  };

  return (
    <>
      <div className="w-full h-96 hidden lg:flex absolute lg:gap-[55rem] items-center justify-around">
        <div
          role="button"
          className="text-5xl text-white bg-gray-600 opacity-50 hover:opacity-70 select-none
           rounded-full p-1 text-center"
          onClick={leftArrowImage}
        >
          <MdOutlineArrowBackIosNew />
        </div>
        <div
          role="button"
          className="text-5xl text-white bg-gray-600 opacity-50 hover:opacity-70 select-none
           rounded-full p-1 text-center"
          onClick={rightArrowImage}
        >
          <MdOutlineArrowForwardIos />
        </div>
      </div>
      <div className="w-full h-96 hidden lg:block bg-slate-950 mt-2 mb-10">
        <div className="mx-60 bg-red-300 h-full opacity-90">
          <img
            className="h-full w-full object-cover select-none"
            src={Urls[imageIdx]}
            alt="carousels"
          />
        </div>
      </div>
    </>
  );
}

export default Carousel;
