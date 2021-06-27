import React from "react";
import "./App.css";
import {AuthHome} from "./components/Auth";
import {useAuth} from "./context/AuthContext";

function App() {
    const {authState} = useAuth();

    React.useEffect(() => {
        console.log("App initialized");
    }, []);

    return (
        <React.Fragment>
            {!authState.isLoggedIn ? <AuthHome/> : <> LOGGED .. IN </>}
        </React.Fragment>
    );
}

export default App;
