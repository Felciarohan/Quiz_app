import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [userAnswers, setUserAnswers] = useState([]); 
  const [finalScore, setFinalScore] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
   
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('https://mock-api.example.com/quizzes');
        setQuizzes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setQuizzes([
          { question: 'What is the capital of Taiwan?', options: ['Taipei', 'Kaohsiung', 'Tainan', 'Taichung'], correctAnswer: 'Taipei' },
          { question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Venus', 'Jupiter'], correctAnswer: 'Mars' },
        ]);
        setIsLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuiz = () => {
    if (!selectedOption) {
      alert('Please select an answer before proceeding.');
      return;
    }

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { quizIndex: currentQuizIndex, answer: selectedOption },
    ]);

   
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
      setSelectedOption('');
    } else {
      calculateFinalScore(); 
    }
  };

  const calculateFinalScore = () => {
    let score = 0;
    userAnswers.forEach((userAnswer, index) => {
      const correctAnswer = quizzes[userAnswer.quizIndex].correctAnswer;
      if (userAnswer.answer === correctAnswer) {
        score++;
      }
    });
    setFinalScore(score); 
  };

 
  if (isLoading) {
    return <div>Loading quizzes...</div>;
  }

  const currentQuiz = quizzes[currentQuizIndex];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h2>Quiz {currentQuizIndex + 1}: {currentQuiz.question}</h2>
      <form>
        {currentQuiz.options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                name="quizOption"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          </div>
        ))}
      </form>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleNextQuiz}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>

      
      {finalScore !== null && (
        <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
          <h3>Quiz Finished!</h3>
          <p>Your final score is: {finalScore} out of {quizzes.length}</p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;