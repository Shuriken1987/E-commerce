import {useState} from "react";
import AuthService from "../../services/authService";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";

function Login({showLoginForm}) {
    const [userData,setUserData] = useState({
        username: "",
        password: ""
    });
    const [isFormValid,setIsFormValid] = useState(true);
    const [isApiErr,setIsApiErr] = useState(false);
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginForm = () => showLoginForm(false);

    const onHandleInput = (e)=>{
        let newInput = userData;
        newInput[e.target.name] = e.target.value;
        setUserData(newInput);
    }

    const onSubmitForm = (e)=>{
        e.preventDefault();
        if (!userData.username || !userData.password) {
            setIsFormValid(false);
            setMessage('Username and password are required');
            setTimeout(()=>setMessage(""),1500);
            return
        }
        setIsFormValid(true);
        //API call
        AuthService.login(userData)
            .then(res =>{
                if (res.status === 200){
                    localStorage.setItem('user', JSON.stringify(res.data));
                    dispatch(setUser(res.data))
                    navigate(`/${res.data.isAdmin ? 'dashboard': ''}`);
                }
            })
            .catch(err => {
                setMessage(err.response.data);
                setTimeout(()=>setMessage(""),1500);
                setIsApiErr(true);
            });
        setMessage("");
    }

    return <>
        <form onSubmit={onSubmitForm} method="post">
                <h3 className="mb-5 text-center">Sign in</h3>
            <label htmlFor="username">Username</label>
            <input className="form-control" name="username" type="text" id="username" onInput={onHandleInput}/>

            <label htmlFor="password">Password</label>
            <input className="form-control mb-3" name="password" type="password" id="password" onInput={onHandleInput}/>

            <button className="btn btn-success px-5 d-block mx-auto">Sign in</button>
            <p className="info">Dont have account ? <a type="button"  onClick={loginForm} className="text-success link">SignUp</a></p>
            {!isFormValid && <p className="text-warning">{message}</p>}
            {isApiErr && <p className="text-danger">{message}</p>}

        </form>
    </>
}

export default Login;
