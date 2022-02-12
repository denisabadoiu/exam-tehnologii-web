const express = require("express");
const router = express.Router();
const crewmemberController = require("../controllers/crewmembe");

router.post('/crewmember/',crewmemberController.addCrewmember);
router.get('/crewmember',crewmemberController.getAllCrewmembers);
router.get('/crewmember/:id',crewmemberController.getCrewmembers);
router.put('/crewmember/:id',crewmemberController.updateCrewmembers);
router.delete('/crewmember/:id',crewmemberController.deleteCrewmember);

module.exports = router;