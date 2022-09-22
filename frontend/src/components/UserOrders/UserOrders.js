import shopService from "../../services/shopService";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import "./userOrders.scss";

function UserOrders() {
    const {user} = useSelector(state => state.userStore);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        shopService.userOrders(user._id)
            .then(res => {
                if (res.status === 200) {
                    setOrders(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    return <>
        {orders.length ?<div>
            <hr/>
            {orders.map((el, index) => {
                return <div className="my-5 user-orders" key={index}>
                    <div className="order-info px-3">
                        <h5>Order number: {el._id}</h5>
                        {el.order_date ? <h5>Order date: {el.order_date}</h5> : null}
                        {el.order_totalPrice ? <h5>Total price: {el.order_totalPrice},00 kr</h5> : null}
                    </div>
                    <div className="order-view">
                        {el.order.map((item) => {
                            return <div className="col-md-3 order-single" key={item._id}>
                                <div className="col-md-6 my-3">
                                    <img src={item.productImg} alt={item.title}/>
                                </div>
                                <div className="col-md-6 item-info mt-2">
                                    <p>{item.title}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: {item.price},00 kr</p>
                                </div>
                            </div>
                        })}
                    </div>
                    <hr/>
                </div>
            })}
        </div>: <h3 className="no-orders">You dont have any orders yet.</h3>}
    </>
}

export default UserOrders;