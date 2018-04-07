export const POST_ITEM = 'POST_ITEM';

export const postItem = (item) => (dispatch) => {
  fetch("http://jsonplaceholder.typicode.com/posts", {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(res=>res.json())
  .then(itemReturned=>dispatch({
    type: POST_ITEM,
    change: itemReturned
  }));
}
