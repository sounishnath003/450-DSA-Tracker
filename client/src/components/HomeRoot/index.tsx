import React from "react";
import {Route, Switch} from "react-router-dom";
import QuestionTopicCard from "../QuestionTopicCard";
import {categoriesRoutes, ICategoryRoutes, IRoute, questionTopicRoutes} from "../../routes";
import UploadCode from "../UploadCode";

const HomeRoot: React.FC = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path={'/'} exact={true} component={() => <QuestionTopicCard/>}/>
                {questionTopicRoutes.map((route: IRoute, index: number) => <Route key={index} exact={true}
                                                                                  path={route.path}
                                                                                  component={route.component}/>)}
                {categoriesRoutes.map((route: ICategoryRoutes<string>, index: number) => <Route key={route.key}
                                                                                                path={route.path}
                                                                                                component={route.component}
                                                                                                exact={true}/>)}
                {questionTopicRoutes.map((route: IRoute, index: number) => <Route key={index} exact={true}
                                                                                  path={`${route.path}/uploadCode`}
                                                                                  component={UploadCode}/>)}

            </Switch>
        </React.Fragment>
    )
}

export default HomeRoot;