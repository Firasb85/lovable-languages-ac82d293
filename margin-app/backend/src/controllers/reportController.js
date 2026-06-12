const prisma = require('../db');
const { generateDiagnosticReport } = require('../utils/diagnosis');

async function createReport(req, res) {
  try {
    const userId = req.user.id;
    const { title, answers, businessName, sector, businessAge, location } = req.body;
    const user = await prisma.user.findUnique({ 
      where: { id: userId }, 
      select: { subscriptionTier: true, reportCount: true, maxReports: true, sector: true, businessName: true, businessAge: true, location: true } 
    });
    
    if (user.subscriptionTier === 'free' && user.reportCount >= user.maxReports) {
      return res.status(402).json({ error: 'Report limit reached', errorAr: 'وصلت إلى الحد الأقصى للتقارير' });
    }
    
    const diagnosticReport = await generateDiagnosticReport(answers, { 
      userId, 
      sector: sector || user.sector, 
      businessName: businessName || user.businessName, 
      businessAge: businessAge || user.businessAge, 
      location: location || user.location 
    });
    
    const report = await prisma.report.create({
      data: {
        title: title || `تقرير تشخيصي - ${new Date().toLocaleDateString('ar-IQ')}`,
        userId,
        sector: sector || user.sector,
        businessName: businessName || user.businessName,
        businessAge: businessAge || user.businessAge,
        location: location || user.location,
        overallScore: diagnosticReport.scores.overallScore,
        riskLevel: diagnosticReport.scores.riskLevel,
        axisScores: JSON.stringify(diagnosticReport.scores.axisScores),
        diagnosis: JSON.stringify(diagnosticReport.diagnosis),
        actionableDecisions: JSON.stringify(diagnosticReport.actionableDecisions),
        ninetyDayPlan: JSON.stringify(diagnosticReport.ninetyDayPlan),
        sectorComparison: JSON.stringify(diagnosticReport.sectorComparison),
        wishText: diagnosticReport.wishText,
        answers: JSON.stringify(answers)
      }
    });
    
    if (user.subscriptionTier === 'free') {
      await prisma.user.update({ where: { id: userId }, data: { reportCount: user.reportCount + 1 } });
    }
    
    res.status(201).json({ 
      message: 'Report created', 
      messageAr: 'تم إنشاء التقرير', 
      report: { 
        ...report,
        axisScores: diagnosticReport.scores.axisScores, 
        diagnosis: diagnosticReport.diagnosis, 
        actionableDecisions: diagnosticReport.actionableDecisions, 
        ninetyDayPlan: diagnosticReport.ninetyDayPlan, 
        sectorComparison: diagnosticReport.sectorComparison, 
        wishText: diagnosticReport.wishText 
      } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllReports(req, res) {
  try {
    const reports = await prisma.report.findMany({ 
      where: { userId: req.user.id }, 
      orderBy: { createdAt: 'desc' } 
    });
    res.status(200).json({ reports });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getReport(req, res) {
  try {
    const report = await prisma.report.findUnique({ where: { id: req.params.id, userId: req.user.id } });
    if (!report) return res.status(404).json({ error: 'Report not found', errorAr: 'التقرير غير موجود' });
    const parsedReport = {
      ...report,
      axisScores: JSON.parse(report.axisScores || '{}'),
      diagnosis: JSON.parse(report.diagnosis || '{}'),
      actionableDecisions: JSON.parse(report.actionableDecisions || '[]'),
      ninetyDayPlan: JSON.parse(report.ninetyDayPlan || '{}'),
      sectorComparison: JSON.parse(report.sectorComparison || '{}'),
      answers: JSON.parse(report.answers || '{}')
    };
    res.status(200).json({ report: parsedReport });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createReport, getAllReports, getReport };