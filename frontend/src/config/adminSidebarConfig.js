import {FaBox, FaBoxes, FaCommentDots, FaPlus, FaSubscript, FaTh, FaUser, FaUsers} from "react-icons/fa";

export const ADMIN_SIDEBAR_CONFIG = [
    {
        name: "Dashboard",
        url: "",
        icon: <FaTh/>,
    },
    {
        name: "Users",
        url: "users",
        icon: <FaUsers/>,
    },
    {
        name: "Comments",
        url: "comments",
        icon: <FaCommentDots/>,
    },
    {
        name: "Products",
        url: "products",
        icon: <FaBoxes/>,
        // subCategory: {
        //     name: "Add product",
        //     url: "add-product",
        //     icon: <FaPlus/>,
        // }
    },
    {
        name: "Add Product",
        url: "add-product",
        icon: <FaPlus/>,
    },
    {
        name: "Subscribers",
        url: "subscribers",
        icon: <FaSubscript/>,
    },
        {
        name: "Orders",
        url: "orders",
        icon: <FaBox/>,
    },
];