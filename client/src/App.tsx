import {Auth0Provider , useAuth0} from "@auth0/auth0-react";
import React from "react";
import "./App.css";
import {AuthHome} from "./components/Auth";
import {QuestionDataContext2Provider} from "./context/QuestionDataContext2";

function App() {
    const {isAuthenticated , user , logout} = useAuth0 ();
    console.log ({user , isAuthenticated});

    React.useEffect (() => {
        isAuthenticated &&
        (async function () {
            const resp = await (
                await fetch (`/.netlify/functions/mango` , {
                    credentials :"same-origin" ,
                    headers :{
                        "Content-Type" :"application/json" ,
                        Authorization :`Bearer ${btoa (user.sub)}` ,
                    } ,
                })
            ).json ();
            console.log ({resp});
        }) ();
    } , [isAuthenticated , user]);

    return (
        <Auth0Provider domain="dev-olv9gbvh.us.auth0.com"
                       clientId="qEDUv12CscBtA4tUEMiv9CHBlmZcX0cM" >
                       {/*> redirectUri={window.location.origin}*/}
            {isAuthenticated ? <QuestionDataContext2Provider/> : <AuthHome/>}
            {isAuthenticated && <button onClick={() => logout ()}> Logout </button>}
        </Auth0Provider>
    );
}

export default App;
