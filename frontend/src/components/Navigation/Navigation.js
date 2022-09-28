import React, {useEffect, useState} from "react";
import {NavLink, Link, useNavigate} from "react-router-dom";
import {routeConfig} from "../../config/routeConfig";
import "./navigation.scss";
import {useSelector, useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";
import ShopCart from "../ShopCart/ShopCart";
import {FaBars} from "react-icons/fa";


function Navigation() {
    const {user} = useSelector((state) => state.userStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSticky, setIsSticky] = useState(false);
    const [isHamburger, setIsHamburger] = useState(false);
    const [isMedia, setIsMedia] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        window.addEventListener('resize', listenToResize)
    }, [])

    const listenToScroll = () => {
        window.scrollY > 500 ? setIsSticky(true) : setIsSticky(false);
    }

    const listenToResize = () => {
        window.innerWidth < 601 ? setIsMedia(true) : setIsMedia(false);
    }

    const showHamburger = () => {
        isHamburger ? setIsHamburger(false) : setIsHamburger(true);
    }


    return (
        <nav className={`main-nav ${isHamburger ? 'responsive' : ''} ${isSticky ? 'sticky-nav' : ''}`}
             style={!isSticky && isHamburger ? {position: "relative"} : null}>
            <div className="container main-nav-links">

                {isMedia &&<Link className="nav-link furn-logo" to={routeConfig.HOME.url}>
                    <span>FoodFlorist</span>
                    <span>Helsingborg</span>
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
                <a className="icon" onClick={showHamburger}>
                    <FaBars/>
                </a>
            </div>
        </nav>
    );
}

export default Navigation;
