import {firebase} from '../firebase';
const db = firebase.firestore();

class FirebaseItemProvider{
  constructor(){
    this.lastItem = null
  }

  getItems = (startIndex, endIndex)=>{
    let itemQuery
    if (startIndex==0) {
      itemQuery = db.collection('items')
      .orderBy('createdOn', 'desc')
      .limit(endIndex-startIndex)
    }
    else{
      itemQuery = db.collection('items')
      .orderBy('createdOn', 'desc')
      .startAfter(this.lastItem)
      .limit(endIndex-startIndex)
    }
    return itemQuery.get().then(docSnapshots => {
      this.lastItem = docSnapshots.docs[docSnapshots.docs.length-1];
      return docSnapshots.docs.map(docSnapshots=>docSnapshots.data())})
  }

  putItem = (item)=>{
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
