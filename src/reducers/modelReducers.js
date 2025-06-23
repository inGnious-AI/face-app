export const sourceModelsReducers = (state = {}, action) => {
  switch (action.type) {
    case "GET_SOURCE_SUCCESS":
      return {
        loading: false,
        sources: action.payload,
      };
    default:
      return state;
  }
};

export const backgroundModelReducers = (state = {}, action) => {
  switch (action.type) {
    case "SET_BACKGROUND_REQUEST":
      return { loading: true };
    case "SET_BACKGROUND_SUCCESS":
      return {
        loading: false,
        bgModel: action.payload,
      };
      case "SET_BACKGROUND_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const hairModelReducers = (state = {}, action) => {
  switch (action.type) {
   
    case "SET_HAIR_SUCCESS":
      return {
        loading: false,
        hair: action.payload,
      };
    
    default:
      return state;
  }
};

export const sourceModelReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_SOURCE_DETAILS_REQUEST":
      return { loading: true };
    case "GET_SOURCE_DETAILS_SUCCESS":
      return {
        loading: false,
        source: action.payload,
      };
    case "GET_SOURCE_DETAILS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


export const tshirtSizeReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_T_SHIRT_SIZE_SUCCESS":
      return {
        loading: false,
        tshirtSize: action.payload, 
      };
    case "SET_T_SHIRT_SIZE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}




export const targetModelReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_TARGET_DETAILS_REQUEST":
      return { loading: true };
    case "GET_TARGET_DETAILS_SUCCESS":
      return {
        loading: false,
        target: action.payload,
      };
    case "GET_TARGET_DETAILS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productModelReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCT_DETAILS_REQUEST":
      return { loading: true };
    case "GET_PRODUCT_DETAILS_SUCCESS":
      return {
        loading: false,
        product: action.payload,
      };
    case "GET_PRODUCT_DETAILS_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const avatarModelDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_AVATAR_DETAILS_REQUEST":
      return { loading: true };
    case "GET_AVATAR_DETAILS_SUCCESS":
      return {
        loading: false,
        avatar: action.payload,
      };
    case "GET_AVATAR_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "GET_AVATAR_DETAILS_RESET":
      return {};
    default:
      return state;
  }
};
