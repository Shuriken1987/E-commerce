import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import shopCartSlice from "./shopCartSlice";
import orderProcessSlice from "./orderProcessSlice";
import loaderSlice from "./loaderSlice";


export default configureStore({
    reducer: {
        userStore: userSlice,
        shopCartStore: shopCartSlice,
        orderProcessStore: orderProcessSlice,
         loaderStore: loaderSlice,
    }
});