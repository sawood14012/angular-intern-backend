var express = require('express');
var fetch = require('cross-fetch');
var algoliasearch = require('algoliasearch');
var router = express.Router();

var algolia_key = process.env.ALGOLIA_KEY;
const client = algoliasearch('9CQGAYW5CN', algolia_key)

const index = client.initIndex('FAKE_FLIPCART')

/* GET Products listing. */
router.get('/api/re-populate', function (req, res, next) {
  getProducts()
  .then(
    function(result){
      clearAll()
      updateIndex(result)
      res.send(result)
    }
  )
});

router.get('/api', function(req, res, next){
   getAll().then(
     function(hits){
       res.send(hits)
     }
   )

});

async function clearAll(){
 result = await index.clearObjects().then((res) => {
  console.log(res);
}).catch(error => console.log(error));
}

async function updateIndex(products) {
  result = await index.saveObjects(products, {
    autoGenerateObjectIDIfNotExist: true
  }).catch(error => console.log(error))
  console.log(result);
  return result;
}


async function getAll(){
  result = await index.search().catch(error => console.log(error));
  return result.hits;
}

async function getProducts() {
  var setObjId = [];
  result = await fetch('https://fakestoreapi.com/products/');
  res = await result.json();
  await res.forEach(element => {
    var temp = {
      "objectID": element.id,
      "title": element.title,
      "description": element.description,
      "category": element.category,
      "price": element.price,
      "image": element.image
    }
    setObjId.push(temp)

  });
  return setObjId;
    
}

module.exports = router;




