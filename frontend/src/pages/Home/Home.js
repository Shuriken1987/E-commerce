import Masonry from "../../components/Masonry/Masonry";
// import HomeSlider from "../../components/HomeSlider/HomeSlider";
import Testimonial from "../../components/Testimonial/Testimonial";
import Header from "../../components/Header/Header";
import Subscribe from "../../components/Subscribe/Subscribe";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import WhoWeAre from "../../components/WhoWeAre/WhoWeAre";


function Home() {

    return (
        <>
            {/*<HomeSlider/>*/}
            <Header/>

            <div className="container">
                <div className="home-section-wrapper my-5">
                    <Masonry changeSide={false}/>
                </div>
            </div>

            <div className="home-section-wrapper my-5">
                    <WhoWeAre/>
                </div>

            <div className=" container">
                <ProductSlider/>
            </div>

            <div className="home-section-wrapper ">
                <Subscribe titleText="save 20% of sale"
                           titleTextBefore="Our Latest Collection"
                           titleTextAfter="Be the first to know about latest and modern bouquets"
                           bgUrl="https://quantumalgorithms.ca/sites/default/files/2021-06/Subscribe%20BG.jpg"
                />
            </div>

            <div className="container my-5">
                <Testimonial/>
            </div>

        </>)
}

export default Home;