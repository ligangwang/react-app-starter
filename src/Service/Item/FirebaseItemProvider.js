import {firebase} from '../firebase';
const db = firebase.firestore();

class FirebaseItemProvider{
  getItems(){
    const itemQuery = db.collection('items').orderBy('createdOn', 'desc').limit(20);
    return (
      itemQuery.get()
      .then(snapshot =>
        snapshot.docs.map(docSnapshot=>docSnapshot.data())
      )
    );
  }

  putItem(item){
    const new_item = {
      ...item,
      createdOn: firebase.firestore.FieldValue.serverTimestamp()
    };
    return db.collection('items').add(new_item)
    .then(docRef=>docRef.get())
    .then(docSnapshot=>docSnapshot.data());
  }
}

const firebaseItemProvider = new FirebaseItemProvider();

export default firebaseItemProvider;
