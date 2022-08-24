import {createSlice} from "@reduxjs/toolkit";

const shopCartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        cartTotalQuantity: 0
    },
    reducers: {
        addToCart: (state, action) => {
            let newItem = Object.assign({}, action.payload);
            let foundItemIndex;
            let foundItem = state.cart.find((item, index) => {
                if (item._id === newItem._id) {
                    foundItemIndex = index;
                    return item;
                }
            });
            if (foundItem) {
                state.cart[foundItemIndex].quantity = state.cart[foundItemIndex].quantity + 1;
                state.cart[foundItemIndex].totalPrice = state.cart[foundItemIndex].quantity * state.cart[foundItemIndex].price
            } else {
                newItem.quantity = 1;
                newItem.totalPrice = newItem.price;
                state.cart.push(newItem);
            }
        },
        removeItem: (state, action) => {
            let cartCopy = [...state.cart];
            cartCopy.splice(action.payload, 1);
            state.cart = cartCopy;
            localStorage.setItem("shopCart", JSON.stringify(cartCopy));
        },
        handleCount: (state, action) => {
            let product = state.cart[action.payload.index];
            let quantity = action.payload.isIncrement ? product.quantity + 1 : product.quantity - 1;
            state.cart[action.payload.index].quantity = quantity < 1 ? 1 : quantity;
            state.cart[action.payload.index].totalPrice = product.quantity * product.price
        },
        setCart: (state,action) => {
            state.cart = action.payload;
        }
    }
});

export const {addToCart, removeItem, handleCount,setCart} = shopCartSlice.actions;
export default shopCartSlice.reducer;