const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../db');

async function register(req, res) {
  try {
    const { email, password, businessName, sector, businessAge, location, phone } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists', errorAr: 'البريد الإلكتروني مستخدم بالفعل' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { 
        email: email.toLowerCase(), 
        password: hashedPassword, 
        businessName, 
        sector, 
        businessAge: parseInt(businessAge), 
        location, 
        phone, 
        subscriptionTier: 'free', 
        reportCount: 0, 
        maxReports: 3 
      },
      select: { id: true, email: true, businessName: true, sector: true, businessAge: true, location: true, phone: true, subscriptionTier: true, reportCount: true, maxReports: true, createdAt: true }
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ message: 'User registered successfully', messageAr: 'تم تسجيل المستخدم بنجاح', user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials', errorAr: 'بيانات الدخول غير صحيحة' });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials', errorAr: 'بيانات الدخول غير صحيحة' });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    const userData = { id: user.id, email: user.email, businessName: user.businessName, sector: user.sector, businessAge: user.businessAge, location: user.location, phone: user.phone, subscriptionTier: user.subscriptionTier, reportCount: user.reportCount, maxReports: user.maxReports, createdAt: user.createdAt };
    res.status(200).json({ message: 'Login successful', messageAr: 'تم تسجيل الدخول بنجاح', user: userData, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function logout(req, res) {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful', messageAr: 'تم تسجيل الخروج بنجاح' });
}

async function getCurrentUser(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, businessName: true, sector: true, businessAge: true, location: true, phone: true, subscriptionTier: true, reportCount: true, maxReports: true, createdAt: true }
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { register, login, logout, getCurrentUser };