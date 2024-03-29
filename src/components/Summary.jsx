import quizCompleteImg from '/src/assets/quiz-complete.png';
import QUESTIONS from "../questions.js";
import { useCallback } from 'react';
import Answers from './Answers.jsx';

export default function Summary({ userAnswer }) {

    const skippedAnswer = userAnswer.filter((answer) => answer === null);
    const correctAnswer = userAnswer.filter((answer, index) => answer === QUESTIONS[index].answers[0]);
    const skippedAnswerShare = Math.round((skippedAnswer.length / userAnswer.length) * 100);
    const correctAnswerShare = Math.round((correctAnswer.length / userAnswer.length) * 100);
    const wrongAnswerShare = 100 - skippedAnswerShare - correctAnswerShare;

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="quiz complete" />
            <h2>Quiz Compeleted!</h2>
            <div id="summary-stats">
                <p>
                    <span className='number'>{skippedAnswerShare}%</span>
                    <span className='text'>skipped</span>
                </p>
                <p>
                    <span className='number'>{correctAnswerShare}%</span>
                    <span className='text'>answered correctly</span>
                </p>
                <p>
                    <span className='number'>{wrongAnswerShare}%</span>
                    <span className='text'>answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswer.map((answer, index) => {
                    let cssClass = 'user-answer';
                    if (answer === null) {
                        cssClass += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct';
                    } else {
                        cssClass += ' wrong';
                    }
                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className='question'>{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'skipped'}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}