import { type } from 'os';
import React, {useState} from 'react';
import { fetchQuestions } from './API'
import { QuestionState, Difficulty } from './API'
import QuizCard from './components/QuizCard';

export type AnswerProp = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerProp[]>([]);
  const [score, setScore] = useState(0);
  const [quizOver, setquizOver] = useState(true);

  console.log(fetchQuestions(TOTAL, Difficulty.EASY))

  const startQuiz = async () => {
   setLoading(true);
   setquizOver(false);

   const newQuestions = await fetchQuestions(
     TOTAL,
     Difficulty.EASY
   )

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false)
  }

  const checkAns = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!quizOver){
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct) setScore((prev) => prev + 1);
      const answerObj: AnswerProp = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  }

  const nextQuiz = async () => {
    const nextQtn = number + 1;
    if (nextQtn === TOTAL){
      setquizOver(true)
    }else{
      setNumber(nextQtn)
    }
    
  }

  return (
    <div className="App">
    <h1>Quiz</h1>
    {quizOver || userAnswers.length === TOTAL ? (
    <button className="start" onClick={startQuiz}>
      Start
    </button>
    ) : null}
    {!quizOver && <p className="score"> Score:</p>}
    {loading && <p className="loader">Loading</p>}
    {!loading && !quizOver && (
    <QuizCard
    questionNumber= {number + 1}
    totalQuestions={TOTAL}
    question={questions[number].question}
    answers={questions[number].answers}
    userAnswer={userAnswers ? userAnswers[number] : undefined}
    callback={checkAns}
    />
    )}
    {!quizOver &&
     !loading && 
     userAnswers.length === number + 1 
     && number !== TOTAL - 1 
     && (
    <button className="next" onClick={nextQuiz}>next</button>
    )}
    </div>
   
  );
}

export default App;
