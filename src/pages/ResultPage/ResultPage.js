import './ResultPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/toast-context';

const ResultPage = () => {
    const { state: { score, questions } } = useLocation();
    const navigate = useNavigate();
    const { successToast, errorToast } = useToast();

    const goHomeHandler = () => {
        navigate("/");
        successToast("Back to home")
    }
    return (
        <div className="quiz-result">
            <button onClick={goHomeHandler} className="btn-home">Go Home</button>
            <div className="result-page-header">
                <h2>Score: {score} / {questions.length}</h2>
            </div>
            <div className="answers-box">
                {
                    questions.map((question, index) => {
                        return (
                            <div key={index}
                                className="question-box"
                            >
                                <div className="question-text">{index + 1}) {question.question}</div>
                                <div className="option_list">
                                    {
                                        question.options.map((option, index) => {
                                            return (
                                                <div className={`option ${option === question.answer ? 'correct' : 'null'}`} key={index}
                                                >{option}</div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default ResultPage