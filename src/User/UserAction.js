export const CHANGE_USER = 'CHANGE_USER';

export const changeUser = (user) => (dispatch) => {
  dispatch({
    type: CHANGE_USER,
    change: user
  });
}
