import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
// import { productDetailsReducer } from './reducers/productReducers.js'
import {
  sourceModelsReducers,
  sourceModelReducer,
  avatarModelDetailsReducer,
  targetModelReducer,
  backgroundModelReducers,
  productModelReducer,
  hairModelReducers,tshirtSizeReducer
} from "./reducers/modelReducers.js";

const reducer = combineReducers({
  sourceModels: sourceModelsReducers,
  avatarModelDetails: avatarModelDetailsReducer,
  sourceModel: sourceModelReducer,
  targetModel: targetModelReducer,
  productModel: productModelReducer,
  backgroundModel: backgroundModelReducers,
  hairModel: hairModelReducers,
  tshirtSize: tshirtSizeReducer,

});

const avatarDetailsFromStorage = localStorage.getItem("faceless-model_id")
  ? localStorage.getItem("faceless-model_id")
  : "123"
const avatarDetailsWeightFromStorage = localStorage.getItem("weightId")
  ? parseInt(localStorage.getItem("weightId"))
  : 75;

const avatarDetailsHeightFromStorage = localStorage.getItem("heightId")
  ? parseInt(localStorage.getItem("heightId"))
  : 165;

const avatarBodyDimensionsFromStorage = localStorage.getItem("body_dim")
  ? JSON.parse(localStorage.getItem("body_dim"))
  : [143, 39, 105, 91, 99, 90, 30, 53, 89, 56, 45, 49]

const avatarTshirtSizeFromStorage = localStorage.getItem("tshirtSize")
  ? localStorage.getItem("tshirtSize")
  : "4";

const initialState = {
  avatarModelDetails: {
    avatar: {
      modelId: avatarDetailsFromStorage,
      weightId: avatarDetailsWeightFromStorage,
      heightId: avatarDetailsHeightFromStorage,
      bodyDimensions: avatarBodyDimensionsFromStorage,
    },
  },
  tshirtSize: {
    tshirtSize: avatarTshirtSizeFromStorage,
  },
  
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;


