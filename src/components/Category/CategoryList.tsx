import React from "react";
import { Link } from "react-router-dom";

type ICategoryRoute = { path: string; categoryType: string };

const CategoryList = () => {
  const routes: ICategoryRoute[] = [
    { path: "category-lists/easy", categoryType: "Easy" },
    { path: "category-lists/medium", categoryType: "Medium" },
    { path: "category-lists/hard", categoryType: "Hard" },
  ];

  return (
    <div className="my-3">
      <div className="flex justify-evenly space-x-4">
        {routes.map((route: ICategoryRoute, index) => (
          <>
            <Link to={route.path}>
              <div
                className={`items-center px-6 py-2 border-2 ${
                  index === 0
                    ? `border-green-400 hover:bg-green-200`
                    : index === 1
                    ? "border-blue-400 hover:bg-blue-200"
                    : `border-red-400 hover:bg-red-200`
                } cursor-pointer rounded-lg shadow-lg`}
              >
                <div className="flex space-x-1">
                  <div>
                    {" "}
                    {index === 0 ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        ></path>
                      </svg>
                    ) : index === 1 ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <div>{route.categoryType}</div>
                </div>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
