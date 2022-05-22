import { useContext, createContext, useState, useEffect } from 'react';
import { useToast } from './toast-context'
import axios from 'axios'
const QuizContext = createContext();





const QuizProvider = ({ children }) => {
    const [filteredQuiz, setFilteredQuiz] = useState();
    const [selectedQuizId, setSelectedQuizId] = useState();
    const [allQuiz, setAllQuiz] = useState();
    const { errorToast } = useToast();

    const getAllQuiz = async () => {
        try {
            const response = await axios.get("/api/quizzes");
            console.log(response);
            setAllQuiz(response.data.quizes);

        } catch (error) {
            errorToast("Not able to get quiz. Please refresh and try again")

        }
    }

    const getQuizById = async (id) => {
        try {
            const response = await axios.get(`/api/quizzes/${id}`);
            console.log(response);
            setFilteredQuiz(response.data.quiz);
        } catch (error) {
            errorToast("Not able to get filtered quiz. Please refresh and try again!")
        }
    }

    const getQuizByCategory = () => {
        try {

        } catch (error) {

        }
    }

    useEffect(() => {
        getAllQuiz();
        getQuizById("3fe39675-140b-4075-82f3-949a4dc95d18");
    }, [])
    return (
        <QuizContext.Provider
            value={{
                setSelectedQuizId
            }}>
            {children}
        </QuizContext.Provider>
    )
}

const useQuiz = () => useContext(QuizContext);

export { useQuiz, QuizProvider }