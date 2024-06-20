import React, { useContext, useState } from "react";
import { JiraToggle } from "../context/JiraContext";
import createjiraTicket from "../assets/createjiraTicket";
import UnsuccessToast from "../components/toast/UunsuccessToast.jsx";

function JiraPopup() {
  const { setIsJiraOpen } = useContext(JiraToggle);
  const [showToast, setShowToast] = useState("unknown");
  const [isSpin, setIsSpin] = useState(false);
  // console.log(showToast);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:w-2/5 w-4/5 bg-[#EEF7FF] z-40 rounded-md">
      {showToast === "unsuccess" && (
        <UnsuccessToast
          setShowToast={setShowToast}
          message="Something wrong."
        />
      )}
      <div className="w-full border-b-2 border-b-slate-600">
        <p className="lg:text-3xl md:text-2xl text-xl font-medium lg:ms-8 md:ms-3 lg:mt-5 md:mt-3 ms-5 mt-3 mb-2 text-slate-600">
          Tickets to Jira
        </p>
      </div>
      <div className="mt-6 mb-4">
        <form
          onSubmit={(e) =>
            createjiraTicket(e, setShowToast, setIsSpin, setIsJiraOpen)
          }
          className="max-w-sm lg:mx-auto md:mx-8 mx-5 flex flex-col lg:gap-10 md:gap-6 gap-4"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Priority
            </label>
            <select
              name="priority"
              className="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="High">High</option>
              <option value="Medium">Average</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Status
            </label>
            <select
              name="status"
              className="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="summary"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Summary
            </label>
            <textarea
              required
              id="summary"
              name="summary"
              rows="4"
              className="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <div className="flex justify-end md:-mt-3 -mt-1 lg:gap-4 gap-6">
            <button
              disabled={isSpin}
              onClick={() => setIsJiraOpen(false)}
              type="button"
              className="text-red-300 border border-red-300 focus:ring-2 bg-gray-700 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 focus:ring-2 font-medium rounded-lg text-sm px-5 py-2 mb-2"
            >
              {isSpin ? (
                <div role="status">
                  <svg
                    className="inline w-8 h-5 animate-spin text-gray-600 fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <span>Create</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JiraPopup;
