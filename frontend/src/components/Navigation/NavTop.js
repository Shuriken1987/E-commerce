import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {routeConfig} from "../../config/routeConfig";
import {setUser} from "../../redux/userSlice";


import {
    FaPhoneAlt, FaMailBulk, FaSearch, FaUserAlt, FaSignInAlt, FaYoutube, FaInstagram, FaFacebook,
} from "react-icons/fa";
import ShopCart from "../ShopCart/ShopCart";


function NavTop() {
    const {user} = useSelector((state) => state.userStore);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onSearch = e => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const goToShop = e => {
        e.preventDefault();
        search.length > 0 && navigate(`${routeConfig.SHOP.url}?search=${search}`);
    }

    const test = e => {
        if (e.keyCode === 13) {
            goToShop(e);
        }
    }

    const logOut = () => {
        localStorage.removeItem("user");
        dispatch(setUser({}));
        navigate("/auth");
    };

    const userBtnLayout = () => {
        return user.hasOwnProperty("username") ? (<li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle user"
                   href="/"
                   id="navbarDropdown"
                   role="button"
                   data-bs-toggle="dropdown"
                   aria-expanded="false"
                >
                    <FaUserAlt/>
                </a>
                <ul className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                >
                    <li>
                        <Link to={routeConfig.USER_PROFILE.url}
                              className="dropdown-item user-dropdown"
                        >
                            <i className="bi bi-person-workspace me-2"></i>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to={routeConfig.MY_ORDERS.url}
                              className="dropdown-item user-dropdown">
                            <i className="bi bi-box me-2"></i>
                            My orders
                        </Link>
                    </li>
                    {user.isAdmin === "true" && <li>
                        <Link to={routeConfig.DASHBOARD.url} className="dropdown-item">
                            <i className="bi bi-card-list me-2"></i>
                            Dashboard
                        </Link>
                    </li>}
                    <li onClick={logOut}>
                        <Link to="#" className="dropdown-item">
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Logout
                        </Link>
                    </li>
                </ul>
            </li>
        ) : (
            <li className="nav-item">
                <Link to="/auth" className="nav-link">
                    <FaSignInAlt/>
                </Link>
            </li>
        );
    };

    return (
        <>
            <section className="nav-bar-wrapper">
                <article className="top container">
                    <div className="nav-bar-info ">
                        <div className="info-phone ">
                            <a href="tel:1234567890">
                                <FaPhoneAlt/> &nbsp;  (+1) 123 - 456 - 7890
                            </a>
                        </div>

                        <div className="info-email">
                            <a href="mailto:info@ourdomain.com">
                                <FaMailBulk/> &nbsp;  Info@Ourdomain.Com
                            </a>
                        </div>

                        <div className="info-social">
                            <ul className="d-flex">
                                <li>
                                    <a href="https://www.facebook.com/Food-Florist-Helsingborg-102803464926190"
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <FaFacebook/>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/foodfloristhelsingborg" target="_blank"
                                       rel="noopener noreferrer">
                                        <FaInstagram/>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/" target="_blank"
                                       rel="noopener noreferrer">
                                        <FaYoutube/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>

                <article className="nav-bar-middle col-md-12">
                    <div className="col-md-4 middle-logo">
                        <Link className="navbar-brand furn-logo" to={routeConfig.HOME.url}>
                            <span>FoodFlorist</span>
                            <span>Helsingborg</span>
                        </Link>
                    </div>

                    <div className='col-md-4 middle-search'>
                        <input type='search' placeholder='Search...'
                               onKeyDown={e => test(e)}
                               onChange={e => onSearch(e)}/>
                        <span className="search-icon" onClick={e => goToShop(e)}> <FaSearch/> </span>
                    </div>

                    <div className="col-md-4 middle-cart">
                        <div className="info-account">{userBtnLayout()}</div>
                        <div className="cart-icon">
                            <ShopCart/>
                        </div>
                    </div>
                </article>
            </section>
        </>
    );
}

export default NavTop;
