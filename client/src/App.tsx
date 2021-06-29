import React from "react";
import "./App.css";
import { AuthHome } from "./components/Auth";
import Home from "./components/Home";
import { useAuth } from "./context/AuthContext";

function App() {
  const { authState } = useAuth();

  React.useEffect(() => {
    console.log("App initialized");
    // getData((k:any)=>console.log(k));
  }, []);

  return (
    <React.Fragment>
      {!authState.isLoggedIn ? <AuthHome /> : <Home />}
    </React.Fragment>
  );
}

export default App;
