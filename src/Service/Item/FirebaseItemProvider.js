import {firebase} from '../firebase';
const db = firebase.firestore();

class FirebaseItemProvider{
  getItems(){
    return (
      fetch("http://jsonplaceholder.typicode.com/posts")
      .then(res=>res.json())
    );
  }

  putItem(item){
    return (
      fetch("http://jsonplaceholder.typicode.com/posts", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
      })
      .then(res=>res.json())
    );
  }
}

const firebaseItemProvider = new FirebaseItemProvider();

export default firebaseItemProvider;
