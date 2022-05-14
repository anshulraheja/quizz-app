import './Homepage.css'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import {useAuth} from '../../context/auth-context'

const Homepage = () => {
  const {auth} = useAuth();

  return (
    <div className="homepage-container">
        <Navbar/>
        <div className="homepage-content">
          
            <h1>Welcome to Web Dev Quiz</h1>
            <h2>Select
              <Link to="/category" className="category-btn">categories</Link>
              to play quiz
            </h2>
            {!auth.token && <div className="btn-container">
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </div>    }       
        </div>
    </div>
  )
}

export default Homepage