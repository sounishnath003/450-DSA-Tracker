import React from "react";

interface ErrorProps {
  error: string | null;
}

const Error: React.FC<ErrorProps> = ({ error }: ErrorProps) => {
  return (
    <React.Fragment>
      {error && <div className="error"> {error} </div>}
    </React.Fragment>
  );
};

export default Error;
