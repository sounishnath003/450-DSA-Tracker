import React from "react";

export const About: React.FC = () => {
  return (
    <>
      <h2 className="text-4xl text-center">DSA 450 Cracker</h2>
      <div className="text-indigo-700 text-center text-xl tracking-wide uppercase my-4">
        your gateway to crack product based
      </div>
      <div className="div mt-3 text-center p-6 border border-black rounded-lg shadow">
        <div className="text-3xl">🤷 ❤️ About The Project</div>
        <p className="leading-wide text-indigo-800 tracking-loose my-3">
          <ul>
            <li>
              450 DSA Cracker helps you build your confidence in solving any
              coding related question and helps you prepare for your placements
              👨🏻‍🎓.
            </li>

            <li>
              Data Structures and Algorithms ❤️ are used to test the analytical
              skills of the candidates as they are a useful tool to pick out the
              underlying algorithms in real-world problems and solve them
              efficiently. ❤️
            </li>
          </ul>
        </p>
        <div className="leading-none  text-2xl- my-6">
          <a href="/" className="text-blue-800" target="_blank">
            450-DSA
          </a>{" "}
          is your personal web-based progress tracker based on{" "}
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1FMdN_OCfOI0iAeDlqswCiC2DZzD4nPsb/view"
            className="text-indigo-700 bg-red-200"
          >
            DSA Cracker Sheet
          </a>{" "}
          by{" "}
          <a
            target="_blank"
            href="https://in.linkedin.com/in/love-babbar-38ab2887"
            className="text-red-800 bg-yellow-400 px-2 rounded"
          >
            Love Babbar 🙏🏻
          </a>
        </div>
        <div className="">
          <figure className="md:flex bg-gray-100 p-6 rounded-xl md:p-0">
            <img
              className="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
              src="https://avatars1.githubusercontent.com/u/40270033?v=4"
              alt=""
              width="384"
              height="512"
            />
            <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
              <blockquote>
                <p className="text-lg font-semibold">
                  “This Sheet helped me to build my foundation more strong and I
                  got 2 PPOs from TCS Digital from Codevita & Infosys
                  HackWithInfy SES!. I am also in hope can also crack Product
                  Based after a hard practice”
                </p>
              </blockquote>
              <figcaption className="font-medium">
                <div className="text-cyan-600">Sounish Nath</div>
                <div className="text-gray-500 hover:text-indigo-700">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/sounish-nath-897b30186/"
                  >
                    Software Engineer, Student
                  </a>
                </div>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </>
  );
};
