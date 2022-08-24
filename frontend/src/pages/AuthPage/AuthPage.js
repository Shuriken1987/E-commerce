import Login from "../../components/LoginUser/Login";
import Register from "../../components/RegisterUser/Register";
import {useState} from "react";
import "./auth.scss";

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);


    return (
        <div className="auth-wrapper container-fluid">
            <div className="row">
                <div className={`${isLogin ?'col-md-4': 'col-md-8'} p-md-5 mx-auto`}>
                    {isLogin ? <Login showLoginForm={setIsLogin}/> : <Register showLoginForm={setIsLogin}/>}
                </div>
            </div>
        </div>
    );

}

export default AuthPage;