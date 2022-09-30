import {useEffect, useState} from "react";
import ShopService from "../../services/shopService";
import gif from "../../img/icons8-services.gif";

function Orders() {
    // const [orders, setOrders] = useState({});
    //
    // useEffect(() => {
    //     ShopService.getAllOrders()
    //         .then(res => {
    //             setOrders(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }, [])

    return (
        <div >
            <img src={gif} alt="Page comming soon" style={{width: 200, height: 200}}/>
        </div>
        // <table className="table table-striped table-hover table-bordered">
        //     <thead>
        //     <tr>
        //         <th>Order nr.</th>
        //         <th>Products</th>
        //         <th>Content</th>
        //         <th>Date</th>
        //         <th>Status</th>
        //         <th>Action</th>
        //
        //     </tr>
        //     </thead>
        //     <tbody>
        //
        //     </tbody>
        // </table>
    )
}

export default Orders;