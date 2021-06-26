import React from "react";
import "./App.css";

function App() {
  React.useEffect(() => {
    console.log("App initialized");
  }, []);

  return <h2>A Fcukking new app</h2>;
}

export default App;
