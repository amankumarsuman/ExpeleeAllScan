import { types } from "./type";

// export const getAllPublisherData = (payload) => {
//   return {
//     type: types.GET_ALL_PUBLISHER_DATA,
//     payload: payload,
//   };
// };
// export const individualPublisherData = (payload) => {
//   return {
//     type: types.GET_INDIVIDUAL_PUBLISHER_DATA,
//     payload: payload,
//   };
// };
// export const individualPublisherDataEditedSuccessfully = (payload) => {
//   return {
//     type: types.INDIVIDUAL_PUBLISHER_DATA_EDITED_STATUS,
//     payload: payload,
//   };
// };
// export const renderAddPublisherForm = (payload) => {
//   return {
//     type: types.RENDER_ADD_PUBLISHER_FORM,
//     payload: payload,
//   };
// };

// export const getWalletDataRequest = (payload) => {
//   return {
//     type: types.GET_WALLET_DATA_REQUEST,
//     payload: payload,
//   };
// };
// export const getWalletDataSuccess = (payload) => {
//   return {
//     type: types.GET_WALLET_DATA_SUCCESS,
//     payload: payload,
//   };
// };
// export const getWalletDataFailure = (payload) => {
//   return {
//     type: types.GET_WALLET_DATA_FAILURE,
//     payload: payload,
//   };
// };

// export const getWalletData = (payload) => async (dispatch) => {
//   dispatch(getWalletDataRequest());
//   let data;
//   try {
//     if (search.searchTestProfilecode?.trim()) {
//       data =
//         await PUBLIC_API.getTestProfileCommentDictionarySearchByCommentNumber(
//           search.searchTestProfilecode,
//           page,
//           rowsPerPage
//         );
//     } else if (search.searchTestProfileName?.trim()) {
//       data = await PUBLIC_API.getTestProfileCommentDictionarySearchByName(
//         search.searchTestProfileName,
//         page,
//         rowsPerPage
//       );
//     }

//     data = data?.data;
//     let total = data?.total;
//     let lastpage = data?.lastpage;
//     if (data) {
//       let updatedData = data?.TestProileCommentsList?.map((item) => {
//         return {
//           ...item,
//           id: item.code,
//         };
//       });
//       dispatch(
//         TestProfileCommentDictionaryMainTableDataSuccess({
//           data: updatedData,
//           total: total,
//           lastpage: lastpage,
//           currentpage: page,
//           pageSize: rowsPerPage,
//         })
//       );
//     } else {
//       dispatch(
//         TestProfileCommentDictionaryMainTableDataFailure("data not found")
//       );
//       dispatch(
//         snackbarNotification({
//           notificationType: "error",
//           notificationMessage: `The Data is not found`,
//         })
//       );
//     }
//   } catch (error) {
//     dispatch(
//       TestProfileCommentDictionaryMainTableDataFailure("data not found")
//     );
//     dispatch(
//       snackbarNotification({
//         notificationType: "error",
//         notificationMessage: `The Data is not found`,
//       })
//     );
//   } finally {
//     dispatch(
//       updateSearchInTestProfileCommentDictionary({
//         searchCommentNumber: search.searchCommentNumber,
//         searchDescription: search.searchDescription,
//       })
//     );
//     // dispatch(addModifyTestProfileFilterEnable());
//   }
// };
export const transactionStatusAndData = (payload) => {
  return {
    type: types.GET_WALLET_DATA,
    payload: payload,
  };
};
export const getEthereumPrice = (payload) => {
  return {
    type: types.GET_ETHEREUM_PRICE,
    payload: payload,
  };
};
export const getBinancePrice = (payload) => {
  return {
    type: types.GET_BINANCE_PRICE,
    payload: payload,
  };
};
export const getMaticPrice = (payload) => {
  return {
    type: types.GET_MATIC_PRICE,
    payload: payload,
  };
};
export const getArbitrumPrice = (payload) => {
  return {
    type: types.GET_ARBITRUM_PRICE,
    payload: payload,
  };
};
