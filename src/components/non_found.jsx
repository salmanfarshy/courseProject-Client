import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";

function Non_found() {
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const res = await apiRequest.post("/checkUser", {
        token: localStorage.getItem("token"),
      });
      console.log(res.data);
      if (res.data.Id) {
        setIsHome(true);
      }
    };
    checkUser();
  }, []);

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen w-screen text-5xl font-medium">
      <p>404 not found</p>
      <Link to={isHome ? "/" : "/login"} className=" text-2xl underline">
        Home
      </Link>
    </div>
  );
}

export default Non_found;
