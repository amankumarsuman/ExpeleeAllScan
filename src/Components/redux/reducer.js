import { types } from "./type";

const init = {
  allPublisherData: [],
  isNew: false,
  isLoading: false,
  isEdit: false,
  individualPublisherData: {},
  totalPublisher: 0,
  walletData: {},
  ethereumPrice:1000,
  // networkPrice:{
    
    maticPrice:0,
    arbitrumPrice:0,
    binancePrice:0,
  // }
};

export const allscanReducer = (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    // case types.GET_ALL_PUBLISHER_DATA:
    //   return {
    //     ...state,
    //     allPublisherData: payload,
    //   };
    // case types.GET_INDIVIDUAL_PUBLISHER_DATA:
    //   return {
    //     ...state,
    //     individualPublisherData: payload,
    //     isEdit: true,
    //   };
    // case types.INDIVIDUAL_PUBLISHER_DATA_EDITED_STATUS:
    //   return {
    //     ...state,

    //     isEdit: payload?.isEditData,
    //   };
    // case types.RENDER_ADD_PUBLISHER_FORM:
    //   return {
    //     ...state,

    //     isNew: payload?.isNew,
    //   };

    case types.GET_WALLET_DATA:
      return {
        ...state,
        walletData: payload,
        isLoading: payload.isLoading,
      };
    case types.GET_ETHEREUM_PRICE:
      return {
        ...state,
        ethereumPrice: payload,
        
      };
    case types.GET_MATIC_PRICE:
      return {
        ...state,
        maticPrice: payload,
        
      };
    case types.GET_BINANCE_PRICE:
      return {
        ...state,
        binancePrice: payload,
        
      };
    case types.GET_ARBITRUM_PRICE:
      return {
        ...state,
        arbitrumPrice: payload,
        
      };
    default:
      return state;
  }
};
