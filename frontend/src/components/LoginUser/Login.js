import {useState} from "react";
import AuthService from "../../services/authService";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";
import ForgottenPassword from "../ForgottenPassword/ForgottenPassword";

function Login() {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });
    const [isFormValid, setIsFormValid] = useState(true);
    const [isApiErr, setIsApiErr] = useState(false);
    const [forgotPass, setForgotPass] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onHandleInput = (e) => {
        let newInput = userData;
        newInput[e.target.name] = e.target.value;
        setUserData(newInput);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!userData.username || !userData.password) {
            setIsFormValid(false);
            setIsApiErr(false);
            setMessage('Username and password required');
            return;
        }
        setIsFormValid(true);
        //API call
        AuthService.login(userData)
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    dispatch(setUser(res.data))
                    navigate(`/${res.data.isAdmin ? 'dashboard' : ''}`);
                }
            })
            .catch(err => {
                setMessage(err.response.data);
                setIsApiErr(true);
            });
    }

    const ifForfotPass = ()=>{
        setForgotPass(true);
    }

    return <>
        <div className="auth-message">
            {!isFormValid ? <h4 className="text-warning">{message}</h4> : null}
            {isApiErr ? <h4 className="text-danger">{message}</h4>: null}
        </div>
        {!forgotPass ?<form onSubmit={onSubmitForm} method="post">
            <label htmlFor="username">Username</label>
            <input className="form-control" name="username" type="text" id="username" onInput={onHandleInput}/>

            <label htmlFor="password">Password</label>
            <input className="form-control mb-3" name="password" type="password" id="password" onInput={onHandleInput}/>
            <button className="btn-auth mb-3 px-5 d-block mx-auto">Sign in</button>
            <Link to={'#'} className="info" onClick={ifForfotPass}>Forgot password?</Link>
        </form>: <ForgottenPassword/>}
    </>
}

export default Login;
