import React from "react";

const OCredit: React.FC = () => {
  return (
    <>
      <div className=" mx-auto mb-6">
        <div className="text-2xl text-indigo-600 text-center font-serif mb-3">
          {" "}
          || Project Confession ||
        </div>
        <div className="my-3">
          <div className="m-auto">
            {" "}
            <img
              src="https://avatars3.githubusercontent.com/u/41658324?s=60&u=bcd49ba9c2af0c3368c52d53b4d32b70045c432b&v=4"
              alt="ashish-logo"
              className="rounded-full mx-auto"
            />
          </div>
        </div>
        <div className="leading-4">
          <p className="=my-3">
            This app was heavily influenced by{" "}
            <a
              href="https://github.com/AsishRaju/450-DSA"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 font-bold hover:text-blue-900 font-mono"
            >
              V Ashish Raju's
            </a>{" "}
            created app{" "}
            <a
              href="http://450dsa.com"
              target="_blank"
              rel="noreferrer"
              className="text-red-700 font-bold hover:text-red-900 font-mono"
            >
              450 DSA
            </a>{" "}
            .
          </p>
          <p className="my-3">
            When I was looking to get a Tracker & found this app really helpful.
          </p>
          <p className="my-3">
            I strongly <b className="text-pink-600">recommend</b> you to go and
            show some love ❤️ to the creator
            <a
              href="https://github.com/AsishRaju/450-DSA"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 hover:text-blue-900"
            >
              {" "}
              (V Ashish Raju's)
            </a>{" "}
            .{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default OCredit;
