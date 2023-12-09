const express = require('express');
const router = express.Router();
const { test, testCreate, getAirToday, getSumAirToday, getSumAirWeek } = require('../Controllers/VolumeAir');



router.get("/", test);
router.get("/TestCreate", testCreate);
router.get("/HariIni", getAirToday);
router.get("/SumHariIni", getSumAirToday);
router.get("/Week", getSumAirWeek);
module.exports = router;