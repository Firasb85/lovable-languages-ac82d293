const express = require('express');
const router = express.Router();
const { createReport, getAllReports, getReport } = require('../controllers/reportController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);
router.post('/', createReport);
router.get('/', getAllReports);
router.get('/:id', getReport);

module.exports = router;