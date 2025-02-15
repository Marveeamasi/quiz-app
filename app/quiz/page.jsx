'use client'
import DragAndDrop from '@/components/DragAndDrop';
import FeedbackModal from '@/components/FeedbackModal';
import MultipleChoice from '@/components/MultipleChoice';
import QuizProgress from '@/components/QuizProgress';
import { questions } from '@/utils/questions';
import { useEffect, useState } from 'react';

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
 
  useEffect(()=>{localStorage.removeItem("quizResults");},[])

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer) => {
    let correct = false;
    let correctAnswer = currentQuestion.correctAnswer || currentQuestion.correctOrder;
  
    if (currentQuestion.type === "drag-and-drop") {
      correct =
        JSON.stringify(answer.map(String)) ===
        JSON.stringify(currentQuestion.correctOrder.map(String));
    } else {
      correct = JSON.stringify(answer) === JSON.stringify(correctAnswer);
    }
  
    setIsCorrect(correct);
    setShowFeedback(true);
    setUserAnswers([...userAnswers, answer]);
  
    let userAnswerActual;
    let correctAnswerActual;
  
    if (currentQuestion.type === "drag-and-drop") {
      userAnswerActual = answer.join(', ');
      correctAnswerActual = correctAnswer.join(', ');
    } else {
      userAnswerActual = Array.isArray(answer)
        ? answer.map((index) => currentQuestion.options[index]).join(', ')
        : currentQuestion.options[answer];
      correctAnswerActual = Array.isArray(correctAnswer)
        ? correctAnswer.join(', ')
        : correctAnswer;
    }
  
    const newResult = {
      question: currentQuestion.question,
      userAnswer: userAnswerActual,
      correctAnswer: correctAnswerActual,
      correct,
    };
  
    const quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    quizResults.push(newResult);
    localStorage.setItem("quizResults", JSON.stringify(quizResults));
  
    console.log("Stored quiz results:", quizResults);
  
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        window.location.href = "/results";
      }
    }, 1000);
  }; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-y-hidden bg-gray-100 p-4 border-box">
      <QuizProgress progress={progress} />
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        {currentQuestion.type === 'multiple-choice' ? (
          <MultipleChoice
            question={currentQuestion.question}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
          />
        ) : (
          <DragAndDrop
            question={currentQuestion.question}
            correctOrder={currentQuestion.correctOrder}
            onAnswer={handleAnswer}
          />
        )}
      </div>
      {showFeedback && <FeedbackModal isCorrect={isCorrect} />}
    </div>
  );
}
