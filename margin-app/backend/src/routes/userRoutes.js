const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { authenticate } = require('../middleware/authMiddleware');

router.use(authenticate);
router.get('/me', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, businessName: true, sector: true, businessAge: true, location: true, phone: true, subscriptionTier: true, reportCount: true, maxReports: true, createdAt: true }
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;