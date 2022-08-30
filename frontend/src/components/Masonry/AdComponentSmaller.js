import {routeConfig} from "../../config/routeConfig";
import {Link} from "react-router-dom";

function AdComponentSmaller({products}) {

    return (
        <>
            {products.map((el, index) => {
                if (index < 2) {
                    return (
                        products &&<div className={`${index % 2 === 0 ? 'modern-box modern-shop reverse' : 'modern-box modern-shop'}`} key={el._id}>
                            <div className="col-md-7 col-sm-6 col-xs-6 img-holder">
                                <img src={el.productImg} className="img" alt={el.title}/>
                            </div>
                            <div className="col-md-5 col-sm-6 col-xs-6">
                                <h3 className="ad-heading">Save up to 50% off</h3>
                                <h5 className="description">Food bouquets</h5>
                            </div>
                            <Link className="shop-now" to={routeConfig.PRODUCT_SHOP.realUrl(el._id)}>Shop now
                                <i className="bi bi-caret-right-fill" aria-hidden={true}> </i>
                            </Link>
                        </div>
                    )
                }
            })}
        </>
    )
}

export default AdComponentSmaller;