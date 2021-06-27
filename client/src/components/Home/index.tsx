import React from "react";
import Header from "../Header";
import {QuestionsProvider} from "../../context/QuestionContext";
import Container from "../Container";

interface HomeProps {

}

const Home: React.FC = ({}: HomeProps) => {
    return (
        <QuestionsProvider>
            <div className="p-1 bg-blue-100"></div>
            <Container>
                <Header/>
            </Container>
        </QuestionsProvider>
    );
}

export default Home;