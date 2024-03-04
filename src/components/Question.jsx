import { useState } from "react";
import QUESTIONS from "../questions.js";
import Answers from "./Answers.jsx";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Question({ questionIndex, onSelectAnswer, onSkipAnswer }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000; // 10 seconds

    if (answer.selectedAnswer) {
        timer = 1000; // 1 second after an answer has been submitted
    }
    if (answer.isCorrect !== null) {
        timer = 2000; // 2 seconds to show the result before moving on to next question
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[questionIndex].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null}
                mode={answerState} />

            <h2>{QUESTIONS[questionIndex].text}</h2>

            <Answers
                answers={QUESTIONS[questionIndex].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}