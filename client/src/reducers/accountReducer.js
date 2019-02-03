import {
  FETCH_ACCOUNT_REQUSTED,
  FETCH_ACCOUNT_SUCCEEDED,
  FETCH_ACCOUNT_FAILED
} from '../actions/accountActions';

const initialState = {
  account: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_REQUSTED:
      return {
        ...state
      };
    case FETCH_ACCOUNT_SUCCEEDED:
      return {
        ...state,
        account: action.account
      };
    case FETCH_ACCOUNT_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
}
