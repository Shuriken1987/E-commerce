import {useDispatch, useSelector} from "react-redux";
import Modal from 'react-modal';
import {useEffect, useState} from "react";
import {setUser} from "../../redux/userSlice";
import AuthService from "../../services/authService";
import CustomStyle from "./CustomStyle";


function UserAccountSettings({showModal}) {
    const {user} = useSelector(state => state.userStore);
    const [editedUser, setEditedUser] = useState({});
    const [passIsShown, setPassIsShown] = useState(false);
    const [isApiErr, setIsApiErr] = useState(false);
    const [isApiFinish, setIsApiFinish] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setEditedUser(user);
    }, [user.username]);

    useEffect(() => {
        showModal(true);
    }, []);

    const togglePassword = () => {
        setPassIsShown((passIsShown) => !passIsShown);
    };

    const closeModal = (e) => {
        e.preventDefault();
        showModal(false);
    }

    const onHandleInput = (e) => {
        setEditedUser({...editedUser, [e.target.name]: e.target.value});
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(editedUser)
        if (!editedUser.username || !editedUser.password || !editedUser.email || !editedUser.email.includes("@")) {
            setIsValidForm(false);
            return
        }

        setIsValidForm(true);
        AuthService.userUpdate(editedUser)
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('user', JSON.stringify(editedUser));
                    dispatch(setUser(editedUser));
                    setIsApiErr(false);
                    setIsApiFinish(true);
                    setTimeout(() => showModal(false), 1500);
                }
            })
            .catch(err => {
                setIsApiErr(true);
                console.log(err)
            })
    }

    return (
        <>
            <Modal isOpen={true} ariaHideApp={false} style={CustomStyle} aria-labelledby='contained-modal-title-vcenter' centered>
                {!isValidForm ? <p className="text-danger">All fields are required!</p> : null}
                {isApiFinish ? <p className="text-success">Successfuly updated!</p> : null}
                {isApiErr ? <p className="text-danger">ERROR:Ooops, something went wrong, please try later!</p> : null}

                <form onSubmit={onSubmitForm} method="post">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="label" htmlFor="username">Username</label>
                            <input className="form-control" name="username" type="text" id="username"
                                   value={editedUser.username || ''}
                                   onChange={onHandleInput}/>

                            <label className="label" htmlFor="firstName">First name</label>
                            <input className="form-control" name="firstName" type="text" id="firstName"
                                   value={editedUser.firstName || ''}
                                   onInput={onHandleInput}/>

                            <label className="label" htmlFor="lastName">Last name</label>
                            <input className="form-control" name="lastName" type="text" id="lastName"
                                   value={editedUser.lastName || ''}
                                   onChange={onHandleInput}/>

                            <label className="label" htmlFor="password">Password</label>
                            <input className="form-control" name="password" type={passIsShown ? "text" : "password"}
                                   id="password"
                                   value={editedUser.password || ''}
                                   onInput={onHandleInput}/>
                            <div className="checkbox-container">
                                <label className="label" htmlFor="checkbox">Show password? </label>
                                <input className="mx-1"
                                       id="checkbox"
                                       type="checkbox"
                                       checked={passIsShown}
                                       onChange={togglePassword}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="label" htmlFor="email">Email</label>
                            <input className="form-control " name="email" type="email" id="email"
                                   value={editedUser.email || ''}
                                   onInput={onHandleInput}/>

                            <label className="label" htmlFor="address">Address</label>
                            <input className="form-control" type="text" id="address" name="address"
                                   value={editedUser.address || ''}
                                   onInput={onHandleInput}/>

                            <label className="label" htmlFor="city">City</label>
                            <input className="form-control" type="text" id="city" name="city"
                                   value={editedUser.city || ''}
                                   onInput={onHandleInput}/>
                        </div>
                        <div className="footer d-flex justify-content-center my-3">
                            <button className="btn mx-2 btn-save">Save</button>
                            <button className="btn mx-2 close-modal" onClick={closeModal}>Close</button>
                        </div>

                    </div>
                </form>
            </Modal>
        </>
    )

}

export default UserAccountSettings;