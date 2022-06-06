import './CategoryPage.css'
import {useState, useEffect} from 'react'
import {useCategory} from '../../context/category-context';
import Navbar from '../../components/Navbar/Navbar';
import { useQuiz } from '../../context/quiz-context';
import { useNavigate, useLocation } from 'react-router-dom';

const CategoryPage = () => {
    const {getCategories, getQuizzesInCategory, category : {categories, categoryQuiz, categoryName}} = useCategory();
    const {setSelectedQuizId} = useQuiz();
    const [isCategoryActive, setIsCategoryActive] = useState(false);
    let navigate = useNavigate();
    const {pathname } = useLocation();

    useEffect(() => {
        if(pathname==='/category'){
            setIsCategoryActive(false);
        }   
        else if(pathname.split("/").length > 1){
            getQuizzesInCategory(pathname.split("/")[2]);
            setIsCategoryActive(true);
        }
    },[pathname])

    useEffect(() => {
        getCategories();
    }, [])

    const playQuiz = (item) => {
        navigate(`/quiz/${item._id}`)
        setSelectedQuizId(item._id);
    } 

    const openCategory = (selectedCategoryName) => {
        getQuizzesInCategory(selectedCategoryName)
        setIsCategoryActive(true)
        navigate(`/category/${selectedCategoryName}`);
    }

  return (
    <div className="main-container">
        <Navbar />
        {isCategoryActive == false && <div className="category-page-content">
            <h2 className="category-title">Categories</h2>
            {
                categories.length > 0 ? 
                <div className="category-card-container">{categories.map(item => {
                    return(
                        <div className="category-card" key={item._id}>
                            <div className="category-card-image-container">
                                <img src={item.img} alt="tech-stack"/>
                            </div>
                            <div className="category-card-info">
                                <div>
                                    <h3>{item.categoryName}</h3>
                                    <h5 className="description-content">{item.description}</h5>
                                </div>
                                <div className="category-btn-container">
                                    <button onClick={() => openCategory(item.category)} className="btn-play">Open</button>
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
        }
        {
            isCategoryActive && <div className="category-page-content">
            <h2 className="category-title">{categoryName}</h2>
            <div className="category-card-container">{categoryQuiz.map(item => {
                return (
                    <div className="category-card" key={item._id}>
                            <div className="category-card-image-container">
                                <img src={item.image} alt="tech-stack"/>
                            </div>
                            <div className="category-card-info">
                                <div>
                                    <h3>{item.title}</h3>
                                    <h5 className="description-content">{item.subtile}</h5>
                                </div>
                                <div className="category-btn-container">
                                    <button className="btn-play" onClick={() =>  playQuiz(item)}>Play</button>
                                </div>
                            </div>
                    </div>
                )

            })}
            </div>
            </div>
        }
    </div>
  )
}

export default CategoryPage
