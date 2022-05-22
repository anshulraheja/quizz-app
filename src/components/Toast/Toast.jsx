import { useToast } from '../../context/toast-context';
import {useEffect, useCallback} from "react";
import "./Toast.css"
const Toast = () => {
  const {toast, setToast} = useToast();

  const deleteToast = useCallback(id => {
    const filteredToast = toast.filter(e => e.id !== id);
    setToast([...filteredToast]);
  }, [toast, setToast]);

  useEffect(() => {
    const interval = setInterval(() => {
      if(toast.length) {
        deleteToast(toast[toast.length-1].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    }
  }, [toast, deleteToast]);
  
  return (
    <>
      {
        toast.length > 0 &&  
        <div className="toast-container">
              {toast.map((item, index) => (
                <div 
                key={index}
                className="toast-content">
                  <button onClick={()=>deleteToast(item.id)} className="toast-close">X</button>
                  <p className="toast-message">{item.msg}</p>
                </div>
              ))}
        </div>
      }
    
    </>
  )
}

export default Toast