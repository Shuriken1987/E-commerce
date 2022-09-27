import Login from "../../components/LoginUser/Login";
import Register from "../../components/RegisterUser/Register";
import {useState} from "react";
import "./auth.scss";
import ErrorPage from "../ErrorPage/ErrorPage";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function AuthPage() {
    const {user} = useSelector(state => state.userStore);
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            {!user?.username ? <div className="auth-wrapper container-fluid">
                <div className="row my-5">
                    <div className="holder">
                        <Link to={'#'} className={isLogin ? 'active' : null} onClick={()=> setIsLogin(true)}>Sign in</Link>
                        <Link to={'#'} className={!isLogin ? 'active' : null} onClick={()=>setIsLogin(false)}>Register</Link>
                    </div>
                    <div className={`${isLogin ? 'col-md-4' : 'col-md-8'}  mx-auto`}>
                        {isLogin ? <Login/> : <Register/>}
                    </div>
                </div>
            </div> : <ErrorPage/>}
        </>
    );
}

export default AuthPage;