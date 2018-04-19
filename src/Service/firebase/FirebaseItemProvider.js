import {firebase} from './firebaseApp';
const db = firebase.firestore();

class FirebaseItemProvider{
  constructor(){
    this.lastQueryDocumentSnapshot = null
    this.getItems = this.getItems.bind(this)
    this.putItem = this.putItem.bind(this)
  }

  getItems(searchValue, startAt, batchSize){
    let itemQuery
    if (startAt===0) {
      itemQuery = db.collection('items')
      .orderBy('createdOn', 'desc')
      .limit(batchSize)
    }
    else{
      itemQuery = db.collection('items')
      .orderBy('createdOn', 'desc')
      .startAfter(this.lastQueryDocumentSnapshot)
      .limit(batchSize)
      
    }
    return itemQuery.get().then(itemQuerySnapshot => {
      this.lastQueryDocumentSnapshot = itemQuerySnapshot.docs[itemQuerySnapshot.docs.length-1];
      return itemQuerySnapshot.docs.map(itemQueryDocumentSnapshot=>{
        const {id, ...item} = itemQueryDocumentSnapshot.data()
        return {...item, id:itemQueryDocumentSnapshot.id}
      })})
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

  deleteItem(id){
    db.collection("items").doc(id).delete().then(
      ()=>{
        console.log(`${id} deleted`)
      }
    ).catch((error)=>{
      console.error(`deletion error: ${id}: `, error)
    })
  }
}

const firebaseItemProvider = new FirebaseItemProvider();

export default firebaseItemProvider;
