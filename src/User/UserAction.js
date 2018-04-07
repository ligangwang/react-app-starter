export const CHANGE_LOGIN_STATE = 'CHANGE_LOGIN_STATE';

export const changeLoginState = (isSignedIn) => (dispatch) => {
  dispatch({
    type: CHANGE_LOGIN_STATE,
    change: isSignedIn
  });
}
