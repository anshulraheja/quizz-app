import './RulePage.css'
import React from 'react'
import { useNavigate } from "react-router-dom";


const RulePage = ({closeRuleModal}) => {

  const handlePlay = (id) => {
    navigate(`/category/${id}`);
  }

  
  return (

    <div>
        <div>Rule Page</div>
        <button onClick={closeRuleModal}>Close</button>
        <button>Play Quiz</button>
    </div>
  )
}

export default RulePage