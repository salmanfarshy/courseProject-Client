import React from "react";

function HorizonLoading({ progress, loading }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-[3px] bg-blue-500 transition-all duration-200 ${
        loading === "loading" ? "" : "opacity-0"
      }`}
      style={{ width: `${progress}%` }}
    ></div>
  );
}

export default HorizonLoading;
