import {
    FaFacebookF,
    FaGooglePlusG,
    FaLinkedinIn,
    FaMailBulk,
    FaPhoneAlt,
    FaRegAddressCard,
    FaTwitter
} from "react-icons/fa";

function Footer() {

    return (
        <>
            <footer className="bg-dark text-white">
                <article className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="footer-title">
                                <a href="/">
                                    <span>FoodFlorist</span>
                                    <span>Helsingborg</span>
                                </a>
                            </div>

                            <div className="footer-social-links">
                                <a href="/">
                                    <FaFacebookF/>
                                </a>
                                <a href="/">
                                    <FaTwitter/>
                                </a>
                                <a href="/">
                                    <FaGooglePlusG/>
                                </a>
                                <a href="/">
                                    <FaLinkedinIn/>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h6>About us</h6>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>
                                Repudiandae laboriosam eligendi maiores totam iusto
                                enim sed neque <br/> eaque nulla aut?Lorem ipsum dolor sit amet.
                                Repudiandae laboriosam eligendi maiores totam iusto
                                enim sed neque <br/> eaque nulla aut?Lorem ipsum dolor sit amet.</p>
                        </div>

                        <div className="col-md-4">
                            <h6>Contact us</h6>
                            <ul>
                                <li>
                                    <a className="footer-links" href="tel:1234567890"><FaPhoneAlt/> &nbsp;
                                        <span>Phone: </span> (+1) 123 - 456
                                        -7890</a>
                                </li>
                                <li>
                                    <a className="footer-links" href="mailto:info@ourdomain.com"><FaMailBulk/> &nbsp;
                                        <span>Email:{" "}</span> Info@Ourdomain.Com{" "}</a>
                                </li>
                                <li>
                                    <span className="footer-links"><FaRegAddressCard/> &nbsp;Some address 2a, Helsingborg</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h6>Useful links</h6>
                            <ul>
                                <li>
                                    <a className="footer-links" href="/"> About Us </a>
                                </li>
                                <li>
                                    <a className="footer-links" href="/"> Our Products </a>
                                </li>
                                <li>
                                    <a className="footer-links" href="/"> Customer Support </a>
                                </li>
                                <li>
                                    <a className="footer-links" href="/"> Our Sitemap </a>
                                </li>
                                <li>
                                    <a className="footer-links" href="/"> Contact Us </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
            </footer>

            <section className="bottomBar text-center text-white bg-dark  p-3">
                <p className="mb-0">&copy; 2021. Food Florist Helsingborg. All right reserved | Design by Milan
                    Stanojevic.</p>
            </section>
        </>
    )
}

export default Footer;