import {FaMinusCircle, FaPlusCircle, FaShoppingBag, FaTrashAlt} from "react-icons/fa";
import "./shopCart.scss"
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {handleCount, removeItem} from "../../redux/shopCartSlice";
import {useNavigate} from "react-router-dom";
import {routeConfig} from "../../config/routeConfig";

function ShopCart() {
    const {cart} = useSelector(state => state.shopCartStore);
    const [viewCartOnClick, setViewCartOnClick] = useState(true);
    const shopCartWrapperRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!shopCartWrapperRef.current) {
            return;
        }
        if (cart.length) {
            shopCartWrapperRef.current.classList.add('show-badge');
            localStorage.setItem('shopCart', JSON.stringify(cart));
        } else {
            shopCartWrapperRef.current.classList.remove('show-badge');
        }
    }, [cart]);

    const handleViewCart = (e) => {
        setViewCartOnClick(!viewCartOnClick)
    }

    const removeItemFromCart = (index) => {
        dispatch(removeItem(index));
    };

    const handleShopCartCount = (index, isIncrement) => {
        dispatch(handleCount({index, isIncrement}))
    };

    const goToOrder = (e) => {
        setViewCartOnClick(false);
        navigate(routeConfig.ORDER.url)
    }

    const shopCartSumLayout = () => {
        return cart.map((item, index) => {
            return <div className="shop-cart-item row mt-3" key={index}>
              <div className="col-md-3">
                 <img src={`../../uploads/${item.productImg}`} alt=""/>
              </div>
                <div className="col-md-8">
                  <h5>{item.title}</h5>
                   {item.quantity > 0 && <p className="quantity">Quantity:
                       <FaMinusCircle className="mx-2"
                                      onClick={() => handleShopCartCount(index, false)}
                       />
                       {item.quantity}
                   <FaPlusCircle className="mx-2"
                                 onClick={() => handleShopCartCount(index, true)}
                   />
                   </p>}
                   <p>{item.totalPrice},00 kr</p>
                </div>
                <div className="col-md-1 remove-icon-wrapper">
                    <FaTrashAlt onClick={() => removeItemFromCart(index)}/>
                </div>
            </div>
        })
    };

    return <div ref={shopCartWrapperRef} className="shop-cart-wrapper">
        <FaShoppingBag onClick={e => handleViewCart()}/>
        <span className="shop-cart-badge">{cart.length}</span>
        {
            viewCartOnClick &&
            (
                <div className="shop-cart-sum">
                    <div className="items-wrapper">
                        {shopCartSumLayout()}
                    </div>
                    <div className="order-btn-wrapper">
                        <button className="btn btn-dark order-now"
                                onClick={e => goToOrder()}>
                            Order Now
                        </button>
                    </div>
                </div>
            )
        }
    </div>
}

export default ShopCart;