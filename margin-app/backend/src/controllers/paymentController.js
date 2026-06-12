const prisma = require('../db');

async function processPayment(req, res) {
  try {
    const { tier, amount, paymentMethod, phone } = req.body;
    const userId = req.user.id;
    
    const payment = await prisma.payment.create({
      data: {
        userId,
        tier,
        amount: parseInt(amount),
        paymentMethod,
        phone,
        status: 'completed',
        currency: 'IQD'
      }
    });
    
    // Update subscription
    let endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    
    await prisma.subscription.upsert({
      where: { userId },
      update: {
        tier,
        paymentId: payment.id,
        amount: parseInt(amount),
        startDate: new Date(),
        endDate,
        status: 'active'
      },
      create: {
        userId,
        tier,
        paymentId: payment.id,
        amount: parseInt(amount),
        startDate: new Date(),
        endDate,
        status: 'active'
      }
    });
    
    // Update user subscription tier
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: tier,
        maxReports: tier === 'premium' ? 100 : tier === 'enterprise' ? 1000 : 3
      }
    });
    
    res.status(200).json({ message: 'Payment processed', messageAr: 'تم معالجة الدفع', payment, subscription: 'active' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPayments(req, res) {
  try {
    const payments = await prisma.payment.findMany({ 
      where: { userId: req.user.id }, 
      orderBy: { createdAt: 'desc' } 
    });
    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { processPayment, getPayments };