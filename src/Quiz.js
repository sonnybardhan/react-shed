import React, { useState, useEffect, createContext, useContext } from 'react';

import { data } from './data';
// const QUIZ_API_BASE_URL = 'https://api.frontendexpert.io/api/fe/quiz';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    setQuestions(data);
  }, []);

  const isFirstQuestion = questionIdx === 0;
  const isLastQuestion = questionIdx === questions.length - 1;
  const currentQuestion = questions[questionIdx];

  const updateSelectedAnswers = (questionIdx, answerIdx) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIdx] = answerIdx;
    setSelectedAnswers(newSelectedAnswers);
    console.log(newSelectedAnswers);
  };

  if (!questions.length) return null;
  return (
    <>
      <h1>{currentQuestion.question}</h1>
      {currentQuestion.answers.map((answer, idx) => {
        let classes = 'answer ';
        const selectedAnswer = selectedAnswers[questionIdx];

        if (selectedAnswer === idx) {
          classes +=
            currentQuestion.correctAnswer === idx ? 'correct' : 'incorrect';
        }
        return (
          <h2
            key={answer}
            className={classes}
            onClick={() => {
              if (selectedAnswers[questionIdx] > -1) return;
              updateSelectedAnswers(questionIdx, idx);
            }}
          >
            {answer}
          </h2>
        );
      })}
      <button
        disabled={isFirstQuestion}
        onClick={() => {
          setQuestionIdx(questionIdx - 1);
        }}
      >
        Back
      </button>
      <button
        disabled={isLastQuestion || selectedAnswers[questionIdx] == null}
        onClick={() => {
          setQuestionIdx(questionIdx + 1);
        }}
      >
        Next
      </button>
    </>
  );
}
