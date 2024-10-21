const intialState = {
  loading: false, // ตัวบ่งชี้สถานะการโหลด
  cartItems: [],  // รายการสินค้าที่อยู่ในตะกร้าสินค้า
};

export const rootReducer = (state = intialState, action) => {
  switch (action.type) {
    case "SHOW_LOADING": // แสดงว่ากำลังโหลด
      return {
        ...state,
        loading: true,
      };
    case "HIDE_LOADING": //ซ่อนสถานะโหลด
      return {
        ...state,
        loading: false,
      };
    case "ADD_TO_CART": //เพิ่มสินค้า ลงในตระกร้า และคงสินค้าไว้ในตระกร้าไว้
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "UPDATE_CART": // อัปเดตจำนวนสินค้าในตระกร้า ตามไอดีของสินค้า    
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case "CLEAR_CART": // เพิ่มเคสนี้เพื่อเคลียร์ตะกร้าสินค้า
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
