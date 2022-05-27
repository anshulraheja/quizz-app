import './ResultPage';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
    const { state: { score, questions } } = useLocation();
    console.log(score);
    return (
        <div>
            <div>score: {score}</div>
            <div>
                {
                    questions.map(question => {
                        return (
                            <div>
                                <div>{question.question}</div>
                                <div>
                                    {
                                        question.options.map(option => {
                                            return (<li>{option}</li>)
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