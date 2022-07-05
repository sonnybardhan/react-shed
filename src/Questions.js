import React, { useState, useEffect, useCallback } from 'react';

import { questions as questionsList } from './questionsList';
import { submissions as submissionsList } from './submissionsList';

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [questionsDone, setQuestionsDone] = useState({});

  useEffect(() => {
    setQuestions(questionsList);
    setSubmissions(submissionsList);
  }, []);

  useEffect(() => {
    // console.log('questions reset!', questions);
  }, [questions]);

  useEffect(() => {
    if (questions.length && submissions.length) {
      calculateSubmissions();
    }
  }, [questions, submissions]);

  useEffect(() => {
    createCategoryComponents();
  }, [questionsDone]);

  const calculateSubmissions = useCallback(() => {
    const questionsDone = {};

    const newQuestions = questions;

    newQuestions.forEach((question) => {
      const result = submissions.find((submission) => {
        return submission.questionId === question.id;
      });

      if (!questionsDone[question.category]) {
        questionsDone[question.category] = { done: 0, total: 0 };
      }

      if (result && result.status === 'CORRECT') {
        questionsDone[question.category]['done'] += 1;
      }
      questionsDone[question.category]['total'] += 1;

      let css;

      if (result) {
        css = 'status ' + result.status.toLowerCase().replace('_', '-');
      } else {
        css = 'status unattempted';
      }

      question.css = css;
    });

    setQuestions(newQuestions);
    setQuestionsDone(questionsDone);
  }, [questions, submissions]);

  const createQuestionComponent = (question) => {
    return (
      <div className='question' key={question.id}>
        <div className={question.status}></div>
        <h3>{question.name}</h3>
      </div>
    );
  };

  const createCategoryComponents = () => {
    const result = [];

    for (const category of Object.keys(questionsDone)) {
      const { done, total } = questionsDone[category];
      const heading = `${category} - ${done}/${total}`;

      const element = (
        <div className='category' key={category}>
          <h2>{heading}</h2>
          {questions.map((question) => {
            if (category === question.category) {
              return (
                <div className='question' key={question.id}>
                  <div className={question.css}></div>
                  <h3>{question.name}</h3>
                </div>
              );
            }
          })}
        </div>
      );
      result.push(element);
    }
    return result;
  };

  return <>{createCategoryComponents()}</>;
}
