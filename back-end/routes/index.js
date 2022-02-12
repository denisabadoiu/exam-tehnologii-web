const express = require('express')
const router = express.Router();
const otherRouter = require('./other')
const shipRouter = require('./ship');
const crewmemberRouter=require('./crewmember');

if(process.env.NODE_ENV !== 'production') {
    router.use('/', otherRouter);
}
router.use('/', shipRouter);
router.use('/',crewmemberRouter);

module.exports = router