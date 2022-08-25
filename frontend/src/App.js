import axios from "axios";
import {Routes, Route, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "./redux/userSlice";
import {setCart} from "./redux/shopCartSlice";
import {routeConfig} from "./config/routeConfig";
import {Navigate} from "react-router";


import "../src/assets/scss/style.css";
import NavTop from "./components/Navigation/NavTop";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import AuthPage from "./pages/AuthPage/AuthPage";
import ActivateUser from "./pages/ActivateUser/ActivateUser";
import UserProfile from "./pages/UserProfile/UserProfile";
import Shop from "./pages/Shop/Shop";
import SingleProduct from "./pages/SingleProductPage/SingleProduct";
import Order from "./pages/Order/Order";
import UnsubscribePage from "./pages/UnsubscribePage/UnsubscribePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Loader from "./components/Loader/Loader";
import Contact from "./pages/Contact/Contact";
import AboutUs from "./components/AboutUs/AboutUs";
import Dashboard from "./pages/Dashboard/Dashboard";
// ADMIN COMPONENTS
import CommentsView from "./adminComponents/Comments/CommentsView";
import Users from "./adminComponents/Users/Users";
import Products from "./adminComponents/Products/Products";
import AddProduct from "./adminComponents/Products/AddProduct";
import Subscribers from "./adminComponents/Subscribers/Subscribers";
import Orders from "./adminComponents/Orders/Orders";


// axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.baseURL = 'https://food-florist-hbg.herokuapp.com/';


function App() {
    const {user} = useSelector(state => state.userStore);
    const [isCheckingUserFinished, setIsCheckingUserFinished] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDashboard,setIsDashboard] = useState(false);

    useEffect(() => {
        handleUserLogin();
        handleShopCart();
    }, []);

    const handleUserLogin = () => {
        if (localStorage.hasOwnProperty('user')) {
            dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
        }
        setIsCheckingUserFinished(true);
    }

    const handleShopCart = () => {
        if (localStorage.hasOwnProperty('shopCart')) {
            dispatch(setCart(JSON.parse(localStorage.getItem('shopCart'))))
        }
    }

    return (
        <div className="main-wrapper">
            <Loader/>
            {!isDashboard && <NavTop/>}
            {!isDashboard && <Navigation/>}
            {isCheckingUserFinished &&
                <Routes>
                    <Route path={routeConfig.AUTH.url} element={<AuthPage/>}/>
                    <Route path={routeConfig.HOME.url} element={<Home/>}/>
                    <Route path={routeConfig.SHOP.url} element={<Shop/>}/>
                    <Route path={routeConfig.PRODUCT_SHOP.url} element={<SingleProduct/>}/>
                    {/*<Route path={routeConfig.USER_ACTIVATE.url} element={<ActivateUser/>}/>*/}
                    {user?.username &&<Route path={routeConfig.USER_PROFILE.url} element={<UserProfile/>}/>}
                    <Route path={routeConfig.ORDER.url} element={<Order/>}/>
                    <Route path={routeConfig.UNSUBSCRIBE.url} element={<UnsubscribePage/>}/>
                    <Route path={routeConfig.CONTACT.url} element={<Contact/>}/>
                    <Route path={routeConfig.ABOUT.url} element={<AboutUs/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                    {/*ADMIN PART*/}
                    <Route path={routeConfig.DASHBOARD.url}
                            element={<AdminProtect>
                           <Dashboard isNav={setIsDashboard}/>
                       </AdminProtect>}
                    >
                        <Route path={routeConfig.ADMIN_COMMENTS.url} element={<CommentsView/>}/>
                        <Route path={routeConfig.ADMIN_USERS.url} element={<Users/>}/>
                        <Route path={routeConfig.ADMIN_PRODUCTS.url} element={<Products/>}/>
                        <Route path={routeConfig.ADMIN_ADD_PRODUCT.url} element={<AddProduct/>}/>
                        <Route path={routeConfig.ADMIN_SUBSCRIBERS.url} element={<Subscribers/>}/>
                        <Route path={routeConfig.ADMIN_ORDERS.url} element={<Orders/>}/>
                    </Route>
                </Routes>}
            {!isDashboard && <Footer/>}
        </div>
    );
}

function AdminProtect({children}) {
    const {user} = useSelector(state => state.userStore);

    if (user?.isAdmin !== "true") return <Navigate to={routeConfig.SHOP.url}/>
    return (
        {...children}
    )
}

export default App;
