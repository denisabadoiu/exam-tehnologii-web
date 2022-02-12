const express = require("express");
const router = express.Router();
const shipController = require("../controllers/ship");

router.post('/ship',shipController.addShip);
router.get('/ship',shipController.getAllShips);
router.get('/ship/:id',shipController.getOneShip);
router.put('/ship/:id',shipController.updateShip);
router.delete('/ship/:id',shipController.deleteShip);

module.exports = router;