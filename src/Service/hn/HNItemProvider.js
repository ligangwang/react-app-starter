const PAGE_SIZE = 20
const hitsToItems = (hits)=>(hits.map(hit=>({
  id: hit.objectID, 
  title: hit.title, 
  url: hit.url
})))

class HNItemProvider{
  constructor(){
    this.lastItem = null
  }

  getItems = (searchValue, startAt, batchSize)=>{
    return fetch(`https://hn.algolia.com/api/v1/search?query=${searchValue}&page=${startAt/PAGE_SIZE}&hitsPerPage=${batchSize}`)
    .then(response => response.json())
    .then(result=>hitsToItems(result.hits))
  }

  putItem = (item)=>{
  }
}

const hnItemProvider = new HNItemProvider();

export default hnItemProvider;
