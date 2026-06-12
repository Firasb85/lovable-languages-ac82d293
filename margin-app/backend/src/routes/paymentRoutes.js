const express = require('express');
const router = express.Router();
const { processPayment, getPayments } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);
router.post('/', processPayment);
router.get('/', getPayments);
router.post('/zaincash/callback', processPayment);
router.post('/asiahawala/callback', processPayment);

module.exports = router;