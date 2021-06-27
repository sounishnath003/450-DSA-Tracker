import React from "react";
import "./App.css";
import {AuthHome} from "./components/Auth";
import {useAuth} from "./context/AuthContext";
import Home from "./components/Home";

function App() {
    const {authState} = useAuth();

    React.useEffect(() => {
        console.log("App initialized");
    }, []);

    return (
        <React.Fragment>
            {!authState.isLoggedIn ? <AuthHome/> : <Home/>}
        </React.Fragment>
    );
}

export default App;
