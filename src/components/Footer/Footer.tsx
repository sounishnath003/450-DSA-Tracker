import React from "react";
import { Link } from "react-router-dom";
import { RESET_ALL_PROGRESS } from "../../actions";
import { QuestionDataContext2 } from "../../context/QuestionDataContext2";

function Footer() {
  const year = new Date().getFullYear();
  const { questionActionDispatcher } = React.useContext(QuestionDataContext2);
  function reset() {
    questionActionDispatcher({ type: RESET_ALL_PROGRESS });
  }

  return (
    <footer className="bottom-0 p-3 bg-blue-100">
      <div className="text-center text-sm">
        <p className="uppercase mb-2">
          <span className="px-3 py-1 rounded bg-indigo-700 text-white">
            <span>LinkedIn:</span>{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/sounish-nath-897b30186/"
            >
              Sounish Nath
            </a>{" "}
          </span>{" "}
          |{" "}
          <Link to="/about">
            <span className="text-black bg-yellow-300 px-3 py-1 rounded">
              About
            </span>
          </Link>{" "}
          |{" "}
          <span
            onClick={reset}
            className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded"
          >
            {" "}
            RESET PROGRESS
          </span>
        </p>
        <p>
          Made With Love ❤️ | Copyright © {year} |{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/sounishnath003"
            className="decoration-none outline-none text-blue-700"
          >
            🌟 @git/sounishnath003
          </a>{" "}
          | Love Babbar 450
        </p>
      </div>
    </footer>
  );
}

export default Footer;
