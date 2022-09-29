import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ShopService from "../../services/shopService";
import {FaStar, FaStarHalf} from "react-icons/fa";
import "./singleProductStyle.scss";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/shopCartSlice";
import ProductDetails from "./ProductDetails";
// import LatestProducts from "./LatestProducts";
import Comments from "./Comments";

function SingleProductView() {
    const [product, setProduct] = useState({});
    const [isParamsValid, setIsParamsValid] = useState(true);
    const [isApiFinished, setIsApiFinished] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();

    const getAd = () => {
        ShopService.getProductById(params.productId)
            .then(res => {
                if (res.status === 200) {
                    setProduct(res.data);
                }
                if (!res.data) {
                    setIsParamsValid(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setIsApiFinished(true);
            });
    };

    useEffect(() => {
        if (params.productId) {
            getAd();
        } else {
            setIsParamsValid(false);
        }
    }, []);

    const adLayout = () => {
        return <div className="row mt-5">
            <div className="col-md-6 productImg-holder">
                <img className="single-product-img" src={product.productImg} alt={product.title}/>
            </div>
            <div className="col-md-6 product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">{product.price},00 kr</p>
                <div className="rating-stars-product">
                     <span className="rate-product" style={{cursor: "pointer"}}>
                             <FaStar/><FaStar/><FaStar/><FaStarHalf/>({product.rating})
                     </span>
                </div>
                <div>
                    <button className="btn btn-dark add-to-cart" type="button" onClick={handleAddToCart}>Add to cart
                    </button>
                </div>
                <p className="product-descriptionn">{product.description}</p>
            </div>
        </div>
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    }

    const noParamsMsgLayout = () => {
        return !isParamsValid ? <p>No product with this id.</p> : null;
    };

    return (
        <>
            <div className="container view-ad-wrapper">
                {noParamsMsgLayout()}
                {product && product.hasOwnProperty('_id') && adLayout()}
                {product && <div className="container">
                    <ProductDetails/>
                    {/*<LatestProducts/>*/}
                    <Comments productId={params.productId} productTitle={product.title}/>
                </div>}
            </div>
        </>
    )

}

export default SingleProductView;