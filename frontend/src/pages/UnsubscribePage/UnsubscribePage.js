import React, {useEffect, useState} from 'react';
import SubscribeService from "../../services/subscribeService";
import {useNavigate, useParams} from "react-router-dom";
import "./unsubscribe.scss"

const productInfo = {
    title: "Unsubscribe",
    imgUrl: "https://quantumalgorithms.ca/sites/default/files/2021-06/Subscribe%20BG.jpg"
}

function UnsubscribePage() {
    const params = useParams()
    const navigate = useNavigate()
    const [responseInfo, setResponseInfo] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        SubscribeService.removeFromSubscribeList({subscribeId: params.id})
            .then(res => {
                setResponseInfo(res.data)
            })
            .catch((err) => {
                setResponseInfo({msg: err})
            })
            .finally(() => {
                setTimeout(() => {
                    setIsFinished(true)
                }, 2000)

                setTimeout(() => {
                    navigate("/")
                }, 8000)
            })
    }, [])

    return (
        <div className="unsubscribe-wrapper">
            <div className="container py-5 text-center">
                {isFinished ? <h2>{responseInfo.msg}</h2> : null}
            </div>
        </div>
    );
}

export default UnsubscribePage;