import React from "react";
import { newComment } from "../apis/serverApis";

function CommentSection({ comments, setComments, itemId }) {
  const Comment = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("User"));

    const date = new Date();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const day = date.getDate();
    const year = date.getFullYear();

    const formData = new FormData(e.target);
    formData.append("userName", user?.name);
    formData.append("itemId", itemId);
    formData.append("date", `${month}, ${day}, ${year}`);
    const credentials = Object.fromEntries(formData);

    const res = await newComment(credentials);
    setComments(res.data);
    if (res.data) e.target.reset();
    // console.log(res.data);
  };

  return (
    <section className="bg-white dark:bg-gray-700 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comment
          </h2>
        </div>
        <form onSubmit={Comment} className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-1 focus:ring-primary-200 hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>

        {comments.length ? (
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <article
                key={comment.user}
                className="p-6 text-base bg-white rounded-lg dark:bg-gray-800"
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="../../noimage.png"
                        alt="Michael Gough"
                      />
                      {comment.user}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        {comment.date}
                      </time>
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.comment}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-base text-white text-center">No comment yet!</p>
        )}
      </div>
    </section>
  );
}

export default CommentSection;
