import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./testimonial.scss";
import {useEffect, useState} from "react";
import TestimonialService from "../../services/testimonialService";

function Testimonial() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        TestimonialService.getClients()
            .then(res => {
                if (res.status === 200) {
                    setClients(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const setts = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        dots: true,
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
            }
        },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <>
            {clients.length && <div className="testimonial-box">
                <div className="clients-header">
                    <h3>Words from clients</h3>
                </div>
                <Slider {...setts}>
                    {clients.map((client, index) => {
                        return <div className="col-md-12" key={index}>
                            <div className="testimonial-content">
                                <p>{client.text}</p>
                                <h3>{client.name}</h3>
                                <h5>Happy customer</h5>
                            </div>
                            <div className="testimonial-author">
                                <i><img src={client.image} alt={client.name}/> </i>
                            </div>
                        </div>
                    })}
                </Slider>
            </div>}
        </>
    )
}

export default Testimonial;