import React from "react";
import "./App.css";
import { AuthHome } from "./components/Auth";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { useAuth } from "./context/AuthContext";

function App() {
  const { authState } = useAuth();

  React.useEffect(() => {
    console.log("App initialized");
    //         window.addEventListener('click', () => window.navigator.onLine ? null : window.alert('You are offline! Check your internet connection!'));
  }, []);

  return (
    <React.Fragment>
      {!authState.isLoggedIn ? <AuthHome /> : <Home />}
      <Footer />
    </React.Fragment>
  );
}

export default App;
