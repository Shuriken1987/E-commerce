import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import ShopService from "../../services/shopService";
import {useDispatch} from "react-redux";
import './productSlider.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
import {addToCart} from "../../redux/shopCartSlice";
import {routeConfig} from "../../config/routeConfig";


function ProductSlider() {
    const [ads, setAds] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        ShopService.getRandomAds(5)
            .then(res => {
                if (res.status === 200) {
                    setAds(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }

            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    };

    return (
        <>
            {ads.length ? <div className="our-product-slider">
                <div className="clients-header">
                    <h3>Latest products</h3>
                </div>
                <Slider {...settings}>
                    {ads.map((ad, index) => {
                        return <div className="card slider-card" key={index}>
                            <span className="product-img">
                                <img src={ad.productImg} alt={ad.title}/>
                            </span>
                            <h3>{ad.title}</h3>
                            <span className="price">
                                <span className="amount">
                                    {ad.price},00 kr
                                </span>
                            </span>
                            <p className="hover-content">
                                <a href="#" className="add-to-cart" onClick={e => {
                                    e.preventDefault();
                                    dispatch(addToCart(ad));
                                }}><i className="fa fa-shopping-cart"></i>Add to cart</a> <br/>
                                <Link to={routeConfig.PRODUCT_SHOP.realUrl(ad._id)} className="view-product">
                                    View product
                                </Link>
                            </p>
                        </div>
                    })}
                </Slider>
            </div>: null}
        </>
    )
}

export default ProductSlider;
