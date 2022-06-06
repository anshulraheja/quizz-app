import { createContext, useContext, useReducer } from "react"
import axios from 'axios'
import { useToast } from "./toast-context"
const categoryContext = createContext(null);

const categoryInitialState = {
    categories: [],
    categoryQuiz: [],
    categoryName: ""
}

const categoryReducer = (state, action) => {
    switch (action.type) {
        case "GETCATEGORIES":
            return {
                ...state,
                categories: action.payload.categories
            }
        case "GETCATEGORYQUIZZES":
            return {
                ...state,
                categoryQuiz: action.payload.quizes.models,
                categoryName: action.payload.quizes.models[0].categoryName
            }
        default:
            return state;
    }
}
const CategoryProvider = ({ children }) => {
    const { errorToast } = useToast();
    const [category, categoryDispatcher] = useReducer(categoryReducer, categoryInitialState);

    const getCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            categoryDispatcher({ type: "GETCATEGORIES", payload: response.data })
        } catch (error) {
            errorToast("Not able to get categories. Refresh and try again")
        }
    }

    const getQuizzesInCategory = async (categoryName) => {
        try {
            const response = await axios.get(`/api/categories/${categoryName}`);
            categoryDispatcher({ type: "GETCATEGORYQUIZZES", payload: response.data });
        } catch (error) {
            errorToast("Not able to get quiz of this category. Please refresh and try again!")
        }
    }

    return (
        <categoryContext.Provider
            value={{
                getCategories,
                getQuizzesInCategory,
                category
            }}>
            {children}
        </categoryContext.Provider>
    )
}

const useCategory = () => useContext(categoryContext);

export { useCategory, CategoryProvider }