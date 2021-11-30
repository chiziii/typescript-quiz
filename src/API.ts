import { SwitchArray } from './utils'

export type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "easy",
    HARD = "hard",
}

export const fetchQuestions = async (
    amount: number,
     difficulty: Difficulty
     ) => {
   const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
   const data = await (await (await fetch (url)).json());
   console.log(data);
   return data.results.map((question: Question) => (
       {
           ...question,
           answers: SwitchArray([
               ...question.incorrect_answers, 
               question.correct_answer
            ])
       }
   ))
}