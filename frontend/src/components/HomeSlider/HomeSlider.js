// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import {useEffect, useState} from "react";
import ShopService from "../../services/shopService";
// import "./slider.scss";


function HomeSlider() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        ShopService.getRandomAds(3)
            .then(res => {
                if (res.status === 200) {
                    setAds(res.data)
                }
            })
            .catch(err => {
                console.log(err);

            })
    }, []);


    return (
        <>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {ads.map((el, index) => {
                        return <div className="carousel-item active" key={index}>
                            <img src={`./uploads/${el.productImg}`} className="slide-image" alt={el.title}/>
                        </div>
                    })}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )

}

export default HomeSlider;