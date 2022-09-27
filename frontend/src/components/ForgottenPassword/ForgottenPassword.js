import {useState} from "react";
import AuthService from "../../services/authService";

function ForgottenPassword() {
    const [userEmail, setUserEmail] = useState({email: ""});
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [Msg, setMsg] = useState('');

    const onHandleInput = (e) => {
        let newInput = userEmail;
        newInput[e.target.name] = e.target.value;
        setUserEmail(newInput);
    }

    const onSubmitEmail = (e) => {
        e.target[0].value = "";
        e.preventDefault();
        if (!userEmail.email || !userEmail.email.includes("@")) {
            setIsValidEmail(false);
            setMsg('Not valid email.');
            return;
        }
        setIsValidEmail(true);
        AuthService.forgotPassword(userEmail)
            .then(res => {
                if (res.status === 200) {
                    setMsg(res.data);
                }
            })
            .catch(err => {
                setIsValidEmail(false);
                setMsg(err.response.data);
            })
    }

    return (
        <>
            <p className={!isValidEmail ? `text-danger` : 'text-success'}>{Msg}</p>
            <h3>Reset your password</h3>
            <p>Enter the email address associated with your account and we'll send you a recovery link.</p>
            <form onSubmit={onSubmitEmail}>
                <label htmlFor="email">Email</label>
                <input className="form-control" type="email" id="email" name="email" onInput={onHandleInput}/>
                <button className=" btn-auth">Get new password</button>
            </form>
        </>
    )
}

export default ForgottenPassword;