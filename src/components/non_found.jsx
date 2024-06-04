import { useNavigate } from "react-router-dom";

function Non_found() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen w-screen text-5xl font-medium">
      <p>404 not found</p>
      <button onClick={() => navigate(-1)} className=" text-2xl underline">
        Back
      </button>
    </div>
  );
}

export default Non_found;
