import * as actionTypes from '../actions/types'


const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: [
          ...state.orders,
          {
            id: action.id,
            ...action.orderData
          }
        ]
      }
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      }
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.FETCH_ORDERS_START:
      console.log('in FETCH_ORDERS_START');
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      console.log('in FETCH_ORDERS_SUCCESS');
      return {
        ...state,
        orders: action.orders,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_FAIL:
      console.log('in FETCH_ORDERS_FAIL');
      return {
        ...state,
        loading: false
        // error: true
      }
    default:
      return state
  }
}

export default reducer