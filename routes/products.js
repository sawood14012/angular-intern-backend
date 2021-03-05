var express = require('express');
var fetch = require('cross-fetch');
var algoliasearch = require('algoliasearch');
var router = express.Router();

var algolia_key = process.env.ALGOLIA_KEY;
const client = algoliasearch('9CQGAYW5CN', algolia_key)

const index = client.initIndex('FAKE_FLIPCART')

/* GET Products listing. */
router.get('/api', function (req, res, next) {
  getProducts()
  .then(
    function(result){
      updateIndex(result)
      res.send(result)
    }
  )
});

async function updateIndex(products) {
  result = await index.saveObjects(products, {
    autoGenerateObjectIDIfNotExist: true
  }).catch(error => console.log(error))
  console.log(result);
  return result;
}

async function getProducts() {
  result = await fetch('https://fakestoreapi.com/products/');
  res = await result.json();
  return res;
    
}

module.exports = router;




