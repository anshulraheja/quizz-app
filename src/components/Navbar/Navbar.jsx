import './Navbar.css';
import {Link, useLocation} from 'react-router-dom'
import {useAuth} from '../../context/auth-context'
import { FaRegUserCircle } from 'react-icons/fa';
import {AiFillHome} from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';

const Navbar = () => {
    const { pathname } = useLocation();

    const activeLeaderboard = pathname.includes("leaderboard");
    const activeCategory = pathname.includes("category");
    const activeHome = pathname==="/";
    // let activeHome = false
    // if(pathname === "/"){
    //      activeHome = true
    // }
    const {auth, logoutHandler} = useAuth();
  return (
    <div className="navbar-body">
        <div className="navbar-user-info">
            <div className="user-icon">
                <FaRegUserCircle />
            </div>
            {auth.token && <h2>{auth.user}</h2>}
        </div>
        <div className="navbar-menu">
            <Link to="/">
                <div className={activeHome ? "active-nav nav-item" : "nav-item"}>
                    <AiFillHome/>
                    <h4>Home</h4>
                </div>
            </Link>
            <Link to="/category">
                <div className={activeCategory ? "active-nav nav-item" : "nav-item"}>
                    <BiCategory/>
                    <h4>Category</h4>
                </div>
            </Link>
        </div>
        <div>
        {auth.token && 
            <div className="logout-btn-container">
                <button onClick={logoutHandler}>Logout</button>
            </div>
          }
        </div>
    </div>
  )
}

export default Navbar