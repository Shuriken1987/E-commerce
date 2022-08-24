import {useEffect, useState} from "react";
import ShopService from "../../services/shopService";

function Orders() {
    const [orders, setOrders] = useState({});

    useEffect(() => {
        ShopService.getAllOrders()
            .then(res => {
                setOrders(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <table className="table table-striped table-hover table-bordered">
            <thead>
            <tr>
                <th>Order nr.</th>
                <th>Products</th>
                <th>Content</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>

            </tr>
            </thead>
            <tbody>
            {/*{orders.map((item,index)=>{*/}
            {/*    return <tr key={index}>*/}
            {/*        /!*<td>{item.order[0].title}</td>*!/*/}
            {/*    </tr>*/}
            {/*})}*/}
            {/*{comments.map((comment, index) => {*/}
            {/*    return <tr key={index}>*/}
            {/*        <td>*/}
            {/*            <Link className="nav-link jump-to-product"*/}
            {/*                  to={routeConfig.PRODUCT_SHOP.realUrl(comment.comment_product_id)}>{comment.product_title}</Link>*/}
            {/*        </td>*/}
            {/*        <td>{comment.comment_author}</td>*/}
            {/*        <td className="comment-content">{comment.comment_content}</td>*/}
            {/*        <td>{comment.comment_date}</td>*/}
            {/*        <td className={`comment-status ${comment.comment_status ? 'approved text-success' : 'unapproved text-danger'}`}*/}
            {/*            onClick={() => changeCommentStatus(comment)}>*/}
            {/*            {comment.comment_status ? 'Approved' : 'Unaproved'}*/}
            {/*        </td>*/}
            {/*        <td>*/}
            {/*            <button className="btn btn-outline-danger  px-2"*/}
            {/*                    onClick={() => deleteComment(comment._id)}>Delete*/}
            {/*            </button>*/}
            {/*        </td>*/}
            {/*    </tr>*/}
            {/*})}*/}
            </tbody>
        </table>
    )
}

export default Orders;