import "../../pages/Shop/shopStyle.scss";
import {Link} from "react-router-dom";
import {routeConfig} from "../../config/routeConfig";
import "./shopProductsStyle.scss";
import {FaHeart} from "react-icons/fa";

function ShopProduct({product}) {

    return (
        <>
            {product.hasOwnProperty('productImg') && <div className="col-md-2 my-3 shop-ad-wrapper">
                <Link to={routeConfig.PRODUCT_SHOP.realUrl(product._id)} className="product-view">
                    <div className="card">
                        {/*<FaHeart className="icons"/>*/}
                        <div className="featuredImage">
                            <img src={`./public/uploads/${product.productImg}`} alt={product.title}/>
                        </div>
                        <div className="card-body">
                            <p className="product-title">{product.title}</p>
                            {/*<p>{product.description}</p>*/}
                            <p className="product-price">{product.price},00 kr</p>
                        </div>
                    </div>
                </Link>
            </div>}
        </>
    );
}

export default ShopProduct;
