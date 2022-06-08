import {useEffect, useState, useReducer} from 'react'
import { useQuiz } from '../../context/quiz-context'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './QuizPage.css'
const QuizPage = () => {

  const {getQuizById, selectedQuizId, questions} = useQuiz();
  const { id } = useParams();
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [showScore, setShowScore] = useState(false);
  // const [score, setScore] = useState(0);
  // const [userAns, setUserAns] = useState("")
  // const [showRules, setShowRules] = useState(true);
  const quizInitialState = {
    currentQuestion: 0,
    showScore: false,
    score: 0,
    userAns: "",
    showRules: true,
  }
  const quizReducer = (state, action) => {
    switch(action.type){
      case "UPDATE_CURRENT_QUESTION_NO": return {
        ...state,
        currentQuestion: state.currentQuestion + 1
      }

      case "SHOW_RESULT": return{
        ...state,
        showScore: true
      }

      case "UPDATE_SCORE" : return {
        ...state,
        score: state.score + 1
      }

      case "USER_ANSWER": return {
        ...state ,
        userAns: action.payload
      }

      case "SHOW_RULES" : return {
        ...state,
        showRules: false
      }
    }
  }
  const [quiz, quizDispatcher] = useReducer(quizReducer, quizInitialState);
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
    // setUserAns(selectedOption);
    quizDispatcher({type: "USER_ANSWER", payload: selectedOption})
    if(selectedOption === correctAnswer){
      // setScore(prev => prev +1 );
      quizDispatcher({type: "UPDATE_SCORE"})
    }
  }

  const MoveToNextQuestion = () => {
    const nextQuestion = quiz.currentQuestion + 1;
    if(nextQuestion < questions.length){
      // setCurrentQuestion(prev => prev + 1);
      quizDispatcher({type: "UPDATE_CURRENT_QUESTION_NO"})
    }
    else{
      // setShowScore(true);
      quizDispatcher({type: "SHOW_RESULT"})
    }
    // setUserAns("");
    quizDispatcher({type: "USER_ANSWER", payload: ""})
  }

  const quitHandler = () => {
    // setCurrentQuestion(0);
    // setScore(0);
    // setUserAns("");
    navigate("/");
  }

  if(quiz.showRules) {
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
          <button onClick={() => quizDispatcher({type: "SHOW_RULES"})} className="quiz-start-btn">Start Quiz</button>
        </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="main-container">
      <Navbar/>
      {
        quiz.showScore ?  (
          navigate('/result',{state:{score: quiz.score, questions: questions}})
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
                         <span>{questions[quiz.currentQuestion].question}</span>
                        </div>
                      
                      <div className="option_list">
                        {
                          questions[quiz.currentQuestion].options.map((option, index) => {
                          return( 
                            <div 
                            className={`option ${quiz.userAns && (option === questions[quiz.currentQuestion].answer ? "correct" : option === quiz.userAns && "incorrect")}`}
                            key={index} 
                            onClick={() => handleScore(option, questions[quiz.currentQuestion].answer)}>
                              {option}
                            </div>)
                          })
                        }
                      </div>
                      </div>
                      <div className="quiz-box-footer">
                        <div className="total_que">
                            <span>{quiz.currentQuestion + 1} of {questions.length} Questions</span>
                        </div>
                        <button className="next_btn" onClick={MoveToNextQuestion}>{quiz.currentQuestion === questions.length - 1 ? "Submit" : "Next Question"}</button>
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