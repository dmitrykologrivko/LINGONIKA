import api from '../services/api/accountsApi';

export const FETCH_ACCOUNT_REQUSTED = 'account/fetch-account-requested';
export const FETCH_ACCOUNT_SUCCEEDED = 'account/fetch-account-succeeded';
export const FETCH_ACCOUNT_FAILED = 'account/fetch-account-failed';

export function fetchAccount() {
  return dispatch => {
    dispatch({type: FETCH_ACCOUNT_REQUSTED});

    api.fetchAccount()
      .then(response => dispatch({type: FETCH_ACCOUNT_SUCCEEDED, account: response.data}))
      .catch(error => dispatch({type: FETCH_ACCOUNT_FAILED, error}))
  }
}
