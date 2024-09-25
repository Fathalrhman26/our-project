const express = require('express');
const router = express.Router();
const groceryLists = require('../controllers/groceryListsController')



router.get('/groceryLists',groceryLists.getGroceryLists);
router.post('/groceryLists',groceryLists.addGroceryLists);
router.delete('/groceryLists',groceryLists.deleteGroceryLists);

module.exports = router;