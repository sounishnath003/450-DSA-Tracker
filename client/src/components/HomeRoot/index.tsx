import React from "react";
import {Route, Switch} from "react-router-dom";
import QuestionTopicCard from "../QuestionTopicCard";
import {IRoute, routes} from "../../routes";

const HomeRoot: React.FC = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path={'/'} exact={true} component={() => <QuestionTopicCard/>}/>
                {routes.map((route: IRoute, index: number) => <Route key={index} path={route.path}
                                                                     component={route.component}/>)}
            </Switch>
        </React.Fragment>
    )
}

export default HomeRoot;