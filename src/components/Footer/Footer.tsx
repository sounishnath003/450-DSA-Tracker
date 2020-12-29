import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mb-0 p-3 bg-blue-100">
      <div className="text-center text-sm">
        <p className="text-indigo-600">
          <span className="text-gray-600">LinkedIn:</span>{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/sounish-nath-897b30186/"
          >
            Sounish Nath
          </a>{" "}
          |{" "}
          <Link to="/about">
            <span className="text-black ">About</span>
          </Link>
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
