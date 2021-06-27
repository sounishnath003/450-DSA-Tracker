import React from "react";
import {QuestionsProvider} from "../../context/QuestionContext";
import Container from "../Container";

interface HomeProps {

}

const Home: React.FC = ({}: HomeProps) => {
    return (
        <Container>
            <QuestionsProvider>
                {/*<Header/>*/}
            </QuestionsProvider>
        </Container>
    );
}

export default Home;