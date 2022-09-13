import shopService from "../../services/shopService";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

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
        <div>
            <hr/>
            {orders.map((el, index) => {
                return <div className="my-5" key={index}>
                    <p>Order number: {el._id}</p>
                    {el.order_date ? <p>Order date: {el.order_date}</p>:null}
                    {el.order.map((item) => {
                        return <div className="col-md-3 row" key={item._id}>
                            <div className="col-md-6 my-3">
                                <img src={item.productImg} alt={item.title}/>
                            </div>
                            <div className="col-md-6">
                                <p>{item.title}</p>
                                <p>Price: {item.price},00 kr</p>
                            </div>
                        </div>
                    })}
                    <hr/>
                </div>
            })}
        </div>

    </>
}

export default UserOrders;