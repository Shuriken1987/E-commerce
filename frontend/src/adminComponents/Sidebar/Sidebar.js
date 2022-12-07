import {FaSignOutAlt} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {ADMIN_SIDEBAR_CONFIG} from "../../config/adminSidebarConfig";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";
import {routeConfig} from "../../config/routeConfig";


function Sidebar({sidebarColapse}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("user");
        dispatch(setUser({}));
        navigate("/auth");
    }

    return (
        <div className={`l-navbar ${sidebarColapse ? 'show' : ''}`} id="nav-bar">
            <div className="nav">
                <div>
                    <div className="nav_list">
                        <a href={routeConfig.HOME.url} className="nav_link nav_name">Go to site</a>
                        {ADMIN_SIDEBAR_CONFIG.map((item, index) => {
                            return (
                                <Link className={`nav_link`} to={item.url} key={index}>
                                    {item.icon}<span className="nav_name">{item.name}</span>
                                </Link>
                            ) })}
                    </div>
                </div>
                <a href="#" className="nav_link">
                    <FaSignOutAlt/>
                    <span className="nav_name"
                          onClick={signOut}>
                        SignOut
                    </span>
                </a>
            </div>
        </div>)
}

export default Sidebar;