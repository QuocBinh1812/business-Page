import { createSelector } from "@reduxjs/toolkit"; //tinh toan cac state phu thuoc vao state tren redux de khoi lluu len redux

const cartItemsSelector = (state) => state.cart.cartItems;

// Count number of products in cart
export const cartItemsCountSelector = createSelector(
  cartItemsSelector,
  (cartItems) => cartItems.reduce((count, item) => count + item.quantity, 0)
);

// Calculate total of cart gia tien
export const cartTotalSelector = createSelector(
  cartItemsSelector,
  (cartItems) =>
    cartItems.reduce(
      (total, item) => total + item.product.salePrice * item.quantity,
      0
    )
);
