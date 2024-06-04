import React, { useEffect, useState } from "react";
import { getItem, updateLike } from "../apis/serverApis";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import HorizonLoading from "../components/HorizonLoading";

export async function loader({ params }) {
  const item = await getItem(params.id);
  return item;
}

function Item() {
  const item = useLoaderData()?.data;
  // console.log(item);
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const bo = item?.likes?.includes(item?.owner?._id);
  const [like, setLike] = useState(bo);
  const [commentToggle, setCommentToggle] = useState(false);
  const [noLike, setNoLike] = useState(item?.likes.length || 0);
  const [comments, setComments] = useState(item?.comments || []);

  // formatting the date
  const today = new Date(item?.year);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

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

  const Like = async () => {
    const credentials = { itemId: item?._id, userId: item?.owner?._id };
    const res = await updateLike(credentials);
    setNoLike(res.data.length);
    console.log(res.data);
  };
  // console.log(like);

  return (
    <div className="mt-8 lg:me-3 me-8">
      <button className="flex items-center md:ms-64" onClick={goBack}>
        <IoIosArrowRoundBack size={50} />
        Back
      </button>
      <div className="rounded-lg overflow-hidden md:hover:shadow-md hover:shadow-sm bg-gray-800 md:ms-64 ms-3 md:mb-5 mb-3 md:w-[65rem] w-full mt-5">
        {/* Loading  */}
        <HorizonLoading progress={progress} loading={navigation.state} />

        <div className="flex flex-col gap-3">
          <div className="px-6 py-4 flex flex-col gap-4">
            <div className="font-bold md:text-xl text-lg mb-2 text-white">
              {item?.id}. {item?.name}
            </div>
            <p className="text-gray-300 text-base">
              <em>Author:</em>
              {"  "}
              <span className="font-semibold">{item?.author}</span>
            </p>
            <p className="text-gray-300 text-base">
              <em>Synopsis:</em>
              {"  "}
              <span className="font-semibold">{item?.synopsis}</span>
            </p>
            <p className="text-gray-300 text-base">
              <em>Year:</em>
              {"  "}
              <span className="font-semibold">{formattedDate}</span>
            </p>
            <p className="text-gray-300 text-base">
              <em>Collcetion:</em>
              {"  "}
              <span className="font-semibold">{item?.collection?.name}</span>
            </p>
            <p className="text-gray-300 text-base">
              <em>Owner of item:</em>
              {"  "}
              <span className="font-semibold">{item?.owner?.name}</span>
            </p>
          </div>
          <p className="text-gray-300 ms-5 font-semibold">Tags</p>
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
        </div>
        <div className="flex justify-center mt-8">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-center text-white font-medium">
              {noLike === 1 || noLike === 0
                ? `${noLike} Like`
                : `${noLike} Likes`}
            </p>
            <button
              className={`flex justify-center items-center text-white ${
                like ? "hover:bg-white" : "hover:bg-blue-700"
              } font-medium  rounded-bl-md text-xs py-3 focus:outline-none border-t-2 border-r-2`}
              onClick={() => {
                Like();
                setLike(!like);
              }}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill={`${like ? "#5AB2FF" : "white"}`}
                viewBox="0 0 18 18"
              >
                <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p className="text-center text-white font-medium">
              {comments.length === 1 || comments.length === 0
                ? `${comments.length} Comment`
                : `${comments.length} Comments`}
            </p>
            <button
              className="flex justify-center items-center text-white hover:bg-blue-700 font-medium  rounded-bl-md text-xs py-3 focus:outline-none border-t-2 border-r-2"
              onClick={() => setCommentToggle(!commentToggle)}
            >
              Post comment
            </button>
          </div>
        </div>
        {commentToggle && (
          <CommentSection
            comments={comments}
            setComments={setComments}
            itemId={item?._id}
          />
        )}
      </div>
    </div>
  );
}

export default Item;
