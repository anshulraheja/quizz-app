import { createContext, useContext, useReducer, useState } from "react"
import { v4 as uuid } from "uuid";

const toastContext = createContext(null);


const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState([]);

    const successToast = (msg) => {
        setToast([{ id: uuid(), type: "SUCCESS", msg }, ...toast]);
    }
    const infoToast = (msg) => {
        setToast([{ id: uuid(), type: "INFO", msg }, ...toast])
    }
    const errorToast = (msg) => {
        setToast([{ id: uuid(), type: "ERROR", msg }, ...toast])
    }
    const warningToast = (msg) => {
        setToast([{ id: uuid(), type: "WARNING", msg }, ...toast])
    }
    return (
        <toastContext.Provider
            value={{
                toast, setToast,
                successToast, infoToast, errorToast, warningToast
            }}>
            {children}
        </toastContext.Provider>
    )
}

const useToast = () => useContext(toastContext);

export { useToast, ToastProvider }