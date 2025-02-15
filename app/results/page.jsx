'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    setResults(storedResults);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg">Loading results...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-8">Quiz Results</h1>
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg">No results found. Please complete the quiz first.</p>
        </div>
        <Link href="/">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition mt-8">
            Restart Quiz
          </button>
        </Link>
      </div>
    );
  }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-8">Quiz Results</h1>
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          {results.map((result, index) => (
            <div key={index} className="mb-6 p-4 border rounded-md shadow-sm bg-gray-50">
              <p className="text-lg font-semibold">{result.question}</p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Correct Answer:</span>{' '}
                {Array.isArray(result.correctAnswer)
                  ? result.correctAnswer.join(', ')
                  : result.correctAnswer}
              </p>
              <p className={result.correct ? 'text-green-600' : 'text-red-600'}>
                {result.correct ? 'You were correct' : 'You were incorrect'}
              </p>
            </div>
          ))}
        </div>
    
        <Link href="/">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-85 transition mt-8">
            Restart Quiz
          </button>
        </Link>
      </div>
    );
    
}
