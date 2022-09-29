import Login from "../../components/LoginUser/Login";
import Register from "../../components/RegisterUser/Register";
import {useEffect, useState} from "react";
import "./auth.scss";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

function AuthPage() {
    const {user} = useSelector(state => state.userStore);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        user?.username && navigate("/");
    },[])


    return (
        <>
            {!user?.username && <div className="auth-wrapper container-fluid">
                <div className="row my-5">
                    <div className="holder">
                        <Link to={'#'} className={isLogin ? 'active' : null} onClick={()=> setIsLogin(true)}>Sign in</Link>
                        <Link to={'#'} className={!isLogin ? 'active' : null} onClick={()=>setIsLogin(false)}>Register</Link>
                    </div>
                    <div className={`${isLogin ? 'col-md-4' : 'col-md-8'}  mx-auto`}>
                        {isLogin ? <Login/> : <Register/>}
                    </div>
                </div>
            </div>}
        </>
    );
}

export default AuthPage;