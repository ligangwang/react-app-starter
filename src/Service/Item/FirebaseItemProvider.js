class FirebaseItemProvider{
  getItems(){
    return fetch("http://jsonplaceholder.typicode.com/posts");
  }

  putItem(item){
    return fetch("http://jsonplaceholder.typicode.com/posts", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })
  }
}

const firebaseItemProvider = new FirebaseItemProvider();

export default firebaseItemProvider;
