import { useContext, createContext, useState } from 'react';
import { useToast } from './toast-context'
import axios from 'axios'

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
    const [selectedQuizId, setSelectedQuizId] = useState();
    const [questions, setQuestions] = useState([]);
    const { errorToast } = useToast();

    const getQuizById = async (id = undefined) => {
        if (id) {
            try {
                const response = await axios.get(`/api/quizzes/${id}`);
                setQuestions(response.data.quiz.mcqs);
            } catch (error) {
                errorToast("Not able to get filtered1 quiz. Please refresh and try again!")
            }
        }

        else {
            try {
                const response = await axios.get(`/api/quizzes/${selectedQuizId}`);
                setQuestions(response.data.quiz.mcqs);
            } catch (error) {
                errorToast("Not able to get filtered1 quiz. Please refresh and try again!")
            }
        }

    }
    return (
        <QuizContext.Provider
            value={{
                setSelectedQuizId,
                getQuizById,
                questions
            }}>
            {children}
        </QuizContext.Provider>
    )
}

const useQuiz = () => useContext(QuizContext);

export { useQuiz, QuizProvider }