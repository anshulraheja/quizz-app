import './CategoryPage.css'
import {useState} from 'react'
import {useCategory} from '../../context/category-context';
import Navbar from '../../components/Navbar/Navbar';
import RulePage from '../RulePage/RulePage';
import { useQuiz } from '../../context/quiz-context';
const CategoryPage = () => {
    const {categories} = useCategory();
    const [isRuleOpen, setIsRuleOpen] = useState(false)
    const {setSelectedQuizId} = useQuiz();

    const playQuiz = (id) => {
        setSelectedQuizId(id)
        setIsRuleOpen(true);
    } 

  return (
    <div className="category-container">
        <Navbar />
        <div className="category-page-content">
            <h2 className="category-title">Categories</h2>
            {
                categories.length > 0 ? 
                <div className="category-card-container">{categories.map(category => {
                    return(
                        <div className="category-card" key={category._id}>
                            <div className="category-card-image-container">
                                <img src="https://picsum.photos/200" alt="tech-stack"/>
                            </div>
                            <div className="category-card-info">
                                <div>
                                    <h3>{category.categoryName}</h3>
                                    <h5 className="description-content">{category.description}</h5>
                                </div>
                                <div className="category-btn-container">
                                    <button onClick={() => playQuiz(category._id)} className="btn-play">Play</button>
                                </div>
                            </div>
                        </div>
                    )
                })}</div>
                :
                <div>
                    No categories available
                </div>
            }
        </div>
        {
            isRuleOpen && 
            <RulePage 
            closeRuleModal={() => setIsRuleOpen(false)}
            />
        }
    </div>
  )
}

export default CategoryPage