import React from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  React.useEffect(() => {
    console.log("App initialized");
  }, []);

  return <AuthProvider>{/* dynamically serves  */}</AuthProvider>;
}

export default App;
