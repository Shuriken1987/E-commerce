import React, {useEffect, useRef, useState} from 'react';
import AuthService from "../../services/authService";

function Register({showLoginForm}) {
    const genderSelect = useRef();
    const [userData, setUserData] = useState({
        username: "",
        lastName: "",
        firstName: "",
        password: "",
        email: "",
        gender: "",
        address: "",
        city: "",
    });
    const [isValidForm, setIsValidForm] = useState(true);
    const [isApiErr, setIsApiErr] = useState(false);
    const [isApiFinish, setIsApiFinish] = useState(false);

    useEffect(() => {
        setUserData({gender: genderSelect.current.value})
    }, []);

    const loginForm = () => showLoginForm(true);

    const onHandleInput = (e) => {
        let newInput = userData
        newInput[e.target.name] = e.target.value
        setUserData(newInput)
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!userData.username || !userData.password || !userData.firstName || !userData.lastName || !userData.email || !userData.email.includes("@")) {
            setIsValidForm(false)
            return
        }
        setIsValidForm(true);

        AuthService.register(userData)
            .then(res => {
                if (res.status === 200) {
                    setIsApiErr(false)
                    setIsApiFinish(true)
                }
            }).catch(err => {
            setIsApiErr(true);
        })
    }

    return (
        <>
            <div className="auth-message">
                {!isValidForm && <h4 className="text-warning">All fields are required!</h4>}
                {isApiFinish &&
                    <h4 className="text-success">A verification email has been sent to {userData.email}</h4>}
                {isApiErr &&
                    <h4 className="text-danger">ERROR: Something went wrong with network, please try later!</h4>}
            </div>
            <form onSubmit={onSubmitForm} method="post">
                <h3 className="mb-3 text-center">Sign up</h3>
                <p className="info">Already have account ? <a type="button" onClick={loginForm}
                                                              className="text-info link">Sign in</a></p>
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" type="text" id="username" name="username"
                               onInput={onHandleInput}/>

                        <label htmlFor="password">Password</label>
                        <input className="form-control " type="password" id="password" name="password"
                               onInput={onHandleInput}/>

                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="email" id="email" name="email"
                               onInput={onHandleInput}/>

                        <label htmlFor="city">City</label>
                        <input className="form-control" type="text" id="city" name="city"
                               onInput={onHandleInput}/>


                    </div>
                    <div className="col-md-6">
                        <label htmlFor="last-name">Last name</label>
                        <input className="form-control" type="text" id="last-name" name="lastName"
                               onInput={onHandleInput}/>

                        <label htmlFor="first-name">First name</label>
                        <input className="form-control" type="text" id="first-name" name="firstName"
                               onInput={onHandleInput}/>

                        <label htmlFor="gender">Gender</label>
                        <select className="form-control" ref={genderSelect} id="gender"
                                onInput={onHandleInput}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <label htmlFor="address">Address</label>
                        <input className="form-control" type="text" id="address" name="address"
                               onInput={onHandleInput}/>
                    </div>
                </div>

                <button className="btn btn-success px-5 d-block mx-auto">Sign up</button>
            </form>
        </>
    );
}

export default Register;