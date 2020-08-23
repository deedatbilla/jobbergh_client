import { GET_SHOP_IMAGES } from "../actions/types";

const initialState = {
  shop_images: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SHOP_IMAGES:
      // console.log(state.shop_images)
      return {
        ...state,
        shop_images: [action.payload, ...state.shop_images],
      };

    default:
      return state;
  }
}
