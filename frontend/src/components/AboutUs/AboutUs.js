import image from "../../img/about-1-570x350.jpg";
import "../../assets/scss/style.scss";

function AboutUs() {

    return (
        <>
            <div className="more-info about-info">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="more-info-content">
                                <div className="row">
                                    <div className="col-md-6 align-self-center">
                                        <div className="right-content">
                                            <span>Lorem ipsum dolor sit amet</span>
                                            <h2>Get to know about <em>our company</em></h2>
                                            <p>Fusce nec ultrices lectus. Duis nec scelerisque risus. Ut id tempor
                                                turpis,
                                                ac dignissim ipsum. Nulla ullamcorper, ipsum vel condimentum congue, mi
                                                odio
                                                vehicula tellus, sit amet malesuada justo sem.
                                                <br/><br/>Pellentesque in sagittis lacus, vel auctor sem. Quisque eu
                                                quam
                                                eleifend, ullamcorper dui nec, luctus quam.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="left-image">
                                            <img src={image} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fun-facts">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="left-content">
                                <span>Lorem ipsum dolor sit amet</span>
                                <h2>Modi esse sapiente tenetur <em>impedit laudantium laborum</em></h2>
                                <p>Pellentesque ultrices at turpis in vestibulum. Aenean pretium elit nec congue
                                    elementum. Nulla luctus laoreet porta. Maecenas at nisi tempus, porta metus vitae,
                                    faucibus augue.
                                    <br/><br/>Fusce et venenatis ex. Quisque varius, velit quis dictum sagittis, odio
                                    velit molestie nunc, ut posuere ante tortor ut neque.</p>
                            </div>
                        </div>
                        <div className="col-md-6 align-self-center">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="count-area-content">
                                        <div className="count-digit">634</div>
                                        <div className="count-title">Bouquets made</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="count-area-content">
                                        <div className="count-digit">280</div>
                                        <div className="count-title">Happy clients</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="count-area-content">
                                        <div className="count-digit">115+</div>
                                        <div className="count-title">Ingredients used</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="count-area-content">
                                        <div className="count-digit">26</div>
                                        <div className="count-title">Packages</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default AboutUs;