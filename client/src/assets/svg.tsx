import * as React from "react";

function SvgComponent() {
  return (
    <>
      <svg
        width={48}
        height={1}
        viewBox="0 0 48 1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{"Rectangle 5"}</title>
        <path d="M0 0h48v1H0z" fill="#063855" fillRule="evenodd" />
      </svg>
    </>
  );
}

export default SvgComponent;
