import './CategoryPage.css'
import {useCategory} from '../../context/category-context';
import Navbar from '../../components/Navbar/Navbar';
const CategoryPage = () => {
    const {categories} = useCategory();
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
                                <button className="btn-play">Play</button>
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
    </div>
  )
}

export default CategoryPage