import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {

    const [userAnswer, setUserAnswer] = useState([]);


    const activeQuestionsIndex = userAnswer.length;  //index of the current question being answered
    const quizIsComplete = activeQuestionsIndex === QUESTIONS.length;//check if all questions have been completed

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswer((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return(<Summary userAnswer={userAnswer} />);
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionsIndex}
                questionIndex={activeQuestionsIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer} />
        </div>

    );
}

