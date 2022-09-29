import {useDispatch, useSelector} from "react-redux";
import {FaTrashAlt, FaMinusCircle, FaPlusCircle} from "react-icons/fa";
import {handleCount, removeItem} from "../../../redux/shopCartSlice";

function OrderProcessStepOne() {
    const {cart} = useSelector(state => state.shopCartStore);
    const dispatch = useDispatch();

    const handleShopCartCount = (index, isIncrement) => {
        dispatch(handleCount({index, isIncrement}))
    }

    const removeItemFromCart = (index) => {
        dispatch(removeItem(index))
    };

    const tableRowLayout = () => {
        return cart.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                        <img src={item.productImg} alt={item.title}/>
                    </td>
                    <td>{item.title}</td>
                    <td className="item-quantity">
                        <FaMinusCircle className="mx-2" onClick={() => handleShopCartCount(index, false)}/>
                        <span>{item.quantity}</span>
                        <FaPlusCircle className="mx-2" onClick={() => handleShopCartCount(index, true)}/>
                    </td>
                    <td className="item-price">
                        {item.totalPrice} kr
                    </td>
                    <td>
                        <FaTrashAlt onClick={() => {
                            removeItemFromCart(index)
                        }}/>
                    </td>
                </tr>
            )
        })
    };

    const emptyCartLayout = () => {
        return !cart.length && <p>Cart is empty.</p>
    }

    return (
        <>
            <table className="table table-hover order-table-wrapper">
                <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Count</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {tableRowLayout()}
                </tbody>
            </table>
            {emptyCartLayout()}
        </>
    )
}

export default OrderProcessStepOne;
