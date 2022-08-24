import React, {useEffect, useState} from "react";
import {NavLink, Link, useNavigate} from "react-router-dom";
import {routeConfig} from "../../config/routeConfig";
import "./navigation.scss";
import {useSelector, useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";
import ShopCart from "../ShopCart/ShopCart";


function Navigation() {
    const {user} = useSelector((state) => state.userStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
    }, [])

    const listenToScroll = () => {
        window.scrollY > 500 ? setIsSticky(true) : setIsSticky(false);
    }

    return (
        <nav className={`main-nav ${isSticky ? 'sticky-nav' : ''}`}>
            <div className="main-nav-links container">
                {isSticky &&
                    <Link className="nav-link furn-logo" to={routeConfig.HOME.url}>
                        <span>FF</span>
                        <span>Hbg</span>
                    </Link>}

                <NavLink className="nav-link" to={routeConfig.HOME.url}>
                    Home
                </NavLink>

                <NavLink className="nav-link" to={routeConfig.SHOP.url}>
                    Shop
                </NavLink>

                <NavLink className="nav-link" to={routeConfig.ABOUT.url}>
                    About
                </NavLink>

                <NavLink className="nav-link" to={routeConfig.CONTACT.url}>
                    Contact
                </NavLink>
            </div>
        </nav>
    );
}

export default Navigation;
