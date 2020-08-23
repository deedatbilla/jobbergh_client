import { GET_SHOP_IMAGES} from './types';

export const getShopImages = (payload) => {
  
  return {
    type: GET_SHOP_IMAGES,
    payload:payload
   
  };
};
