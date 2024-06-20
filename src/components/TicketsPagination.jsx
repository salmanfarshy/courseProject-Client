import React from "react";

function TicketsPagination({ startAt, setStartAt, total }) {
  return (
    <div className="mt-5 lg:ms-[480px] md:ms-[280px] ms-[30px]">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <button
            onClick={() => setStartAt(startAt - 1)}
            disabled={startAt === 0}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>

        {startAt < Math.floor(total / 9) && (
          <li>
            <button
              onClick={() => setStartAt(startAt + 1)}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {startAt + 1}
            </button>
          </li>
        )}

        {startAt + 1 < Math.floor(total / 9) && (
          <li>
            <button
              onClick={() => setStartAt(startAt + 2)}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {startAt + 2}
            </button>
          </li>
        )}
        {startAt + 2 < Math.floor(total / 9) && (
          <li>
            <button
              onClick={() => setStartAt(startAt + 3)}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {startAt + 3}
            </button>
          </li>
        )}

        <li>
          <button
            onClick={() => setStartAt(startAt + 1)}
            disabled={startAt === Math.floor(total / 9)}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default TicketsPagination;
