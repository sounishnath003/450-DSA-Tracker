import React from "react";
import {Route, Switch} from "react-router-dom";
import QuestionTopicCard from "../QuestionTopicCard";

const HomeRoot: React.FC = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path={'/'} exact={true} component={() => <QuestionTopicCard/>}/>
            </Switch>
        </React.Fragment>
    )
}

export default HomeRoot;