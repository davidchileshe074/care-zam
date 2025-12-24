const express = require('express');
const { getSponsors, createSponsor } = require('../controllers/sponsors');

const router = express.Router();

router.route('/').get(getSponsors).post(createSponsor);

module.exports = router;
