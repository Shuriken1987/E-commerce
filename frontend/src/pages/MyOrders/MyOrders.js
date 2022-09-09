import shopService from "../../services/shopService";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


function MyOrders() {
    const {user} = useSelector(state => state.userStore);

    shopService.userOrders(user._id)
        .then(res => {
            if (res.status === 200) {
                console.log(res.data[0].order[0])
            }
        })
        .catch(err => {
            console.log(err)
        });

    return <h1>Orders</h1>
}

export default MyOrders;