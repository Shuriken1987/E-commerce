import {routeConfig} from "../../config/routeConfig";
import {Link} from "react-router-dom";

function AdComponentBigger({products}) {
    return (
        <>
            {products.map((el, index) => {
                if (index >= 2) {
                    return (
                        <div className={`${index % 3 === 0 ? 'modern-box modern-product reverse' : 'modern-box modern-product'}`}
                            key={el._id}>
                            <div className="col-md-3 col-sm-6 col-xs-6">
                                    <img src={el.productImg} className="img" alt="" />
                            </div>
                            <div className="col-md-9 col-sm-6 col-xs-6">
                                <h3 className="ad-heading">{el.title}</h3>
                            </div>
                            <Link to={routeConfig.PRODUCT_SHOP.realUrl(el._id)} className="shop-now">Shop now
                                <i className="bi bi-caret-right-fill" aria-hidden={true}> </i>
                            </Link>
                        </div>
                    )
                }
            })}
        </>
    )
}

export default AdComponentBigger;