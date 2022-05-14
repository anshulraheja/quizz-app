import { createContext, useContext, useReducer, useState } from "react"
import axios from 'axios'
import { useToast } from "./toast-context"
import { useEffect } from "react"
const categoryContext = createContext(null);


const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const { errorToast } = useToast();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get("/api/categories");
                setCategories(response.data.categories);
            } catch (error) {
                errorToast("Not able to get categories. Refresh and try again")
            }
        }
        getCategories();
    }, [])

    return (
        <categoryContext.Provider
            value={{
                categories,
                setCategories
            }}>
            {children}
        </categoryContext.Provider>
    )
}

const useCategory = () => useContext(categoryContext);

export { useCategory, CategoryProvider }