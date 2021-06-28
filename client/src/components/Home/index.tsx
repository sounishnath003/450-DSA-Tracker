import React from "react";
import {QuestionsProvider} from "../../context/QuestionContext";
import CategoryFilterProvider from "../../context/CategoryContext";

interface HomeProps {

}

const Home: React.FC = ({}: HomeProps) => {
    return (
        <QuestionsProvider>
            <CategoryFilterProvider>
                {/*<Header/>*/}
            </CategoryFilterProvider>
        </QuestionsProvider>
    );
}

export default Home;