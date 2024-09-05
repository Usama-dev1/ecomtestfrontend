import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "Paypal" };

const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const updateCart = (state) => {
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //shipping price order value >100 shipping cost 0 else 100
  state.shippingPrice = addDecimal(
    state.cartItems.length > 0 ? (state.itemsPrice > 100 ? 0 : 100) : 0
  );
  //tax price 15%
  state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));

  //total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((p) => p._id === item._id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((p) =>
          p._id === existingItem._id ? item : p
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //caluclate items price
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const removeItem = action.payload;
      const existingItem = state.cartItems.find(
        (p) => p._id === removeItem._id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== removeItem._id
        );
      }
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems:(state,action)=>{
     state.cartItems=[]
     return updateCart(state)
    },
    updateQuantityInCart: (state, action) => {
      const { item, qty } = action.payload;
      const existingItem = state.cartItems.find((p) => p._id === item._id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((p) =>
          p._id === item._id ? { ...p, qty: qty } : p
        );
      }
      return updateCart(state);
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  updateQuantityInCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems
} = cartSlice.actions;
export default cartSlice.reducer;
6