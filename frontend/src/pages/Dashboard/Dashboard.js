import "./dashStyle.scss";
import "../../adminComponents/Sidebar/sidebarStyle.scss";
import {useEffect, useState} from "react";
import Sidebar from "../../adminComponents/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";


function Dashboard({isNav}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        isNav(true);
    }, []);

    const showSidebar = () => {
        isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
    };


    return (
        <>
            <div id="body-pd" className={`${isSidebarOpen ? 'body-pd' : ''}`}>
                <div className={`header ${isSidebarOpen ? 'body-pd' : ''}`} id="header">
                    <div className="header_toggle">
                        <i className={`${!isSidebarOpen ? 'bi-arrow-right' : 'bi-x'}`} id="header-toggle"
                           onClick={showSidebar}></i>
                    </div>
                    <div className="header_img"><img src="https://i.imgur.com/hczKIze.jpg" alt=""/></div>
                </div>
                <Sidebar sidebarColapse={isSidebarOpen}/>
                <div className={`height-100 bg-light ${isSidebarOpen ? 'da' : ''}`}>
                       <Outlet/>
                </div>
            </div>

        </>
    )
}

export default Dashboard;