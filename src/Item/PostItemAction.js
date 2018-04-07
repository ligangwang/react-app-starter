export const POST_ITEM = 'POST_ITEM';

export const postItem = (serviceProvider, item) => (dispatch) => {
  serviceProvider.putItem(item)
  .then(res=>res.json())
  .then(itemReturned=>dispatch({
    type: POST_ITEM,
    change: itemReturned
  }));
}
