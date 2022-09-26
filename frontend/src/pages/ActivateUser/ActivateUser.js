import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AuthService from "../../services/authService";
import "./activate.scss";

function ActivateUser() {
    const navigate = useNavigate();
    const params = useParams();
    const [isActivated, setIsActivated] = useState(false);
    const [isApiFinished, setIsApiFinished] = useState(false);

    useEffect(() => {
        if (localStorage.hasOwnProperty('user')) {
            navigate('/');
        } else {
            AuthService.completeRegistration({userId: params.id})
                .then(response => {
                    setIsActivated(true);
                    setTimeout(() => {
                        navigate('/auth');
                    }, 5000)
                })
                .catch(error => {
                    setIsActivated(false);
                })
                .finally(()=> {
                    setIsApiFinished(true);
                })
        }
    }, []);

    const responseMsgLayout = () => {
        return isActivated ?
            <h3 className="activate-user">Successfully activated.</h3> :
            <h3 className="activate-user">User not activated.</h3>
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 activate-holder">
                    {isApiFinished && responseMsgLayout()}
                </div>
            </div>
        </div>
    )
}

export default ActivateUser;
