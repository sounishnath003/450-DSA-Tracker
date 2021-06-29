import React from "react";

interface SuccessProps {
  message: string | null;
}

const Sucess: React.FC<SuccessProps> = ({ message }: SuccessProps) => {
  return (
    <React.Fragment>
      {message && <div className="success"> {message} </div>}
    </React.Fragment>
  );
};

export default Sucess;
