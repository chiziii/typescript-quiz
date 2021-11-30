import React from 'react';
import { AnswerProp } from '../App';

type quizProps = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerProp | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const QuizCard: React.FC<quizProps> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions
}) => (
    <div> 
    <p className="number">
        Question : {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question}}/>
    <div>
        {answers.map((answer) => (
            <div 
            key={answer}
            >
                <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                  <span dangerouslySetInnerHTML={{__html: answer}}/>
                </button>
            </div>
        ))}
    </div>
    </div>
);

export default QuizCard;