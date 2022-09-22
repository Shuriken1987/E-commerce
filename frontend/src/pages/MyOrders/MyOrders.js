import UserOrders from "../../components/UserOrders/UserOrders";
import ErrorPage from "../ErrorPage/ErrorPage";
import {useSelector} from "react-redux";


function MyOrders() {
    const {user} = useSelector(state => state.userStore);

    return <>
        {user.username ? <div className="container">
            <UserOrders/>
        </div> : <ErrorPage/>}
    </>
}

export default MyOrders;