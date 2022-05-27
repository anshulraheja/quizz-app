import {useEffect, useState} from 'react'
import { useQuiz } from '../../context/quiz-context'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
const QuizPage = () => {

  const {getQuizById, selectedQuizId, questions} = useQuiz();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() =>{
    if(selectedQuizId === undefined){
      getQuizById(id);
    }
    else{
      getQuizById();
    }
  },[])

  const handleAnswerButtonClick = (selectedOption, correctAnswer) => {
    if(selectedOption === correctAnswer){
      setScore(prev => prev +1 );
    }
    const nextQuestion = currentQuestion + 1;
    if(nextQuestion < questions.length){
      setCurrentQuestion(prev => prev + 1);
    }
    else{
      setShowScore(true);
    }
  }
  
  return (
    <div>
      <Navbar/>
      {
        showScore ?  (
          navigate('/result',{state:{score: score, questions: questions}})
        ) : (
          <div>
              {
                questions.length > 0 && 
                <div>
                  {
                    <div className="question-section">
                      <div className="question-text">{questions[currentQuestion].question}</div>
                      <div className="answer-section">
                        {
                          questions[currentQuestion].options.map((option, index) => {
                          return( 
                            <button 
                            key={index} 
                            onClick={() => handleAnswerButtonClick(option, questions[currentQuestion].answer)}>{option}</button>)
                          })
                        }
                      </div>
                    </div>
                  }
                </div>
              }
          </div>
        )
      }
    </div>
  )
}

export default QuizPage