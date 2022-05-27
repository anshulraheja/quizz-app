import { createContext, useContext, useState } from "react"
import axios from 'axios'
import { useToast } from "./toast-context"
import { useEffect } from "react"
const categoryContext = createContext(null);


const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [selectdCategory, setSelectedCategory] = useState([])
    const { errorToast } = useToast();

    const getCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            setCategories(response.data.categories);
        } catch (error) {
            errorToast("Not able to get categories. Refresh and try again")
        }
    }

    const getQuizzesInCategory = async (categoryName) => {
        console.log(categoryName)
        try {
            const response = await axios.get(`/api/categories/${categoryName}`);
            console.log(response);
            setSelectedCategory(response.data.quizes.models);
        } catch (error) {
            errorToast("Not able to get quiz of this category. Please refresh and try again!")
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <categoryContext.Provider
            value={{
                categories,
                setCategories,
                selectdCategory,
                getQuizzesInCategory
            }}>
            {children}
        </categoryContext.Provider>
    )
}

const useCategory = () => useContext(categoryContext);

export { useCategory, CategoryProvider }