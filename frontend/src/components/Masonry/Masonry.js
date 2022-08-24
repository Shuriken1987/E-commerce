import {useEffect, useState} from "react";
import ShopService from '../../services/shopService';
import AdComponentSmaller from "./AdComponentSmaller";
import AdComponentBigger from "./AdComponentBigger";
import "./masonryStyle.scss"


function Masonry({changeSide}) {
    const [ads, setAds] = useState([]);
    const [isChangeSide, setIsChangeSide] = useState();

    useEffect(() => {
        ShopService.getRandomAds(5)
            .then((res) => {
                if (res.status === 200) {
                    setAds(res.data);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setIsChangeSide(changeSide)
    }, [changeSide]);

    return (
        <>
            {ads.length && <div className="masonry row">
                <div className={`col-md-5 col-sm-5 col-xs-12 left ad ${!isChangeSide ? 'order-first':'order-last'}`}>
                    <AdComponentSmaller products={ads}/>
                </div>
                <div className="col-md-7 col-sm-7 col-xs-12 right ad">
                    <AdComponentBigger products={ads}/>
                </div>
            </div>}
        </>
    )
}


export default Masonry;
