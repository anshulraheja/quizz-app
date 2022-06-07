import {useEffect, useState} from 'react'
import { useQuiz } from '../../context/quiz-context'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './QuizPage.css'
const QuizPage = () => {

  const {getQuizById, selectedQuizId, questions} = useQuiz();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [userAns, setUserAns] = useState("")
  const [showRules, setShowRules] = useState(true);
  const navigate = useNavigate();

  useEffect(() =>{
    if(selectedQuizId === undefined){
      getQuizById(id);
    }
    else{
      getQuizById();
    }
  },[])

  const handleScore = (selectedOption, correctAnswer) => {
    setUserAns(selectedOption);
    if(selectedOption === correctAnswer){
      setScore(prev => prev +1 );
    }
  }

  const MoveToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if(nextQuestion < questions.length){
      setCurrentQuestion(prev => prev + 1);
    }
    else{
      setShowScore(true);
    }
    setUserAns("");
  }

  const quitHandler = () => {
    setCurrentQuestion(0);
    setScore(0);
    setUserAns("");
    navigate("/");
  }

  if(showRules) {
    return (
      <div className="main-container">
      <div className="rule-container">
        <h1>Rules</h1>
        <ul className="rule-list">
          <li>This quiz consists of 5 multiple-choice questions.</li>
          <li>Points will be awarded : 1 point for each right answer.</li>
          <li>ach multiple choice question has only one correct answer.</li>
          <li>To start, click the Start Quiz button. When finished, click the Submit button.</li>
        </ul>
        <div className="rule-btn-container">
          <button onClick={() => navigate("/category")} className="goback-btn">Go back</button>
          <button onClick={() => setShowRules(false)} className="quiz-start-btn">Start Quiz</button>
        </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="main-container">
      <Navbar/>
      {
        showScore ?  (
          navigate('/result',{state:{score: score, questions: questions}})
        ) : (
          <div className="question-container">
              {
                questions.length > 0 && 
                <div>
                  {
                    <div className="quiz-box">
                      <header>
                          <div className="quiz-box-title">Questions</div>
                          <div className="quiz-box-timer">
                              <div className="time_left_txt" onClick={quitHandler}>Quit Quiz</div>
                          </div>
                      </header>
                      <div className="quiz-box-question">
                        <div className="que_text">
                         <span>{questions[currentQuestion].question}</span>
                        </div>
                      
                      <div className="option_list">
                        {
                          questions[currentQuestion].options.map((option, index) => {
                          return( 
                            <div 
                            className={`option ${userAns && (option === questions[currentQuestion].answer ? "correct" : option === userAns && "incorrect")}`}
                            key={index} 
                            onClick={() => handleScore(option, questions[currentQuestion].answer)}>
                              {option}
                            </div>)
                          })
                        }
                      </div>
                      </div>
                      <div className="quiz-box-footer">
                        <div className="total_que">
                            <span>{currentQuestion + 1} of {questions.length} Questions</span>
                        </div>
                        <button className="next_btn" onClick={MoveToNextQuestion}>{currentQuestion === questions.length - 1 ? "Submit" : "Next Question"}</button>
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