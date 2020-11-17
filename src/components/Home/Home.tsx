import React, { useEffect } from "react";
import { getData } from "../../Backend/services/database";

const Home: React.FC = () => {
  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <h2 className="text-4xl text-center">DSA 450 Cracker</h2>
      <div className="text-indigo-700 text-center text-xl tracking-wide uppercase my-4">
        your gateway to crack product based
      </div>
    </React.Fragment>
  );
};

export default Home;
