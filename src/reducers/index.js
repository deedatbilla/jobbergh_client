import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import notifyReducer from "./notifyReducer";
import RegistrationStepCounterReducer from "./RegistrationStepCounterReducer";
import getShopImagesReducer from "./getShopImagesReducer";

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  stepCounter: RegistrationStepCounterReducer,
  shop_images: getShopImagesReducer,
});
