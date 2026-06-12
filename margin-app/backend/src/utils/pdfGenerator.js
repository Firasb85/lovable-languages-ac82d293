/**
 * Generate PDF report in Arabic (RTL support)
 */
const { PDFDocument, rgb } = require('pdf-lib');

async function generatePDFReport(reportData, userData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();
  const margin = 50;
  const startX = width - margin;
  let y = height - margin;
  
  const font = await pdfDoc.embedFont('Helvetica');
  const boldFont = await pdfDoc.embedFont('Helvetica-Bold');
  
  const drawRTLText = (text, x, y, font, size, color = rgb(0, 0, 0)) => {
    page.drawText(text, { x, y, font, size, color });
  };
  
  y -= 20;
  drawRTLText('تقرير تشخيصي', startX - 100, y, boldFont, 24, rgb(0.2, 0.4, 0.6));
  y -= 30;
  drawRTLText(`اسم العمل: ${reportData.businessName || userData.businessName || 'غير محدد'}`, startX, y, font, 14);
  y -= 20;
  drawRTLText(`القطاع: ${reportData.sector || userData.sector || 'غير محدد'}`, startX, y, font, 12);
  y -= 20;
  drawRTLText(`تاريخ الإنشاء: ${new Date(reportData.createdAt).toLocaleDateString('ar-IQ')}`, startX, y, font, 12);
  y -= 30;
  
  page.drawLine(startX, y - 5, margin, y - 5, { width: 1, color: rgb(0.8, 0.8, 0.8) });
  y -= 20;
  drawRTLText('الدرجة الإجمالية', startX, y, boldFont, 18, rgb(0.2, 0.4, 0.6));
  y -= 25;
  
  const score = reportData.overallScore || 0;
  const riskLevel = reportData.riskLevel || 'medium';
  const riskColors = { high: rgb(0, 0.8, 0), medium: rgb(1, 0.65, 0), low: rgb(1, 0.3, 0.3) };
  const scoreColor = riskColors[riskLevel] || rgb(0.5, 0.5, 0.5);
  
  drawRTLText(`${score}/50`, startX, y, boldFont, 48, scoreColor);
  y -= 60;
  
  const riskLevelAr = reportData.riskLevelAr || (riskLevel === 'high' ? 'عالي' : riskLevel === 'medium' ? 'متوسط' : 'منخفض');
  drawRTLText(`مستوى المخاطر: ${riskLevelAr}`, startX, y, font, 16);
  y -= 30;
  
  page.drawLine(startX, y - 5, margin, y - 5, { width: 1, color: rgb(0.8, 0.8, 0.8) });
  y -= 20;
  drawRTLText('الدرجات حسب المحاور', startX, y, boldFont, 18, rgb(0.2, 0.4, 0.6));
  y -= 25;
  
  let axisScores;
  try { axisScores = JSON.parse(reportData.axisScores || '{}'); } catch (e) { axisScores = {}; }
  
  const axisNames = {
    revenue: 'الإيرادات', customers: 'العملاء', competition: 'التنافس',
    internal: 'العمليات الداخلية', marketing: 'التسويق'
  };
  
  for (const [axis, data] of Object.entries(axisScores)) {
    if (axisNames[axis]) {
      const axisScore = Math.round(data.score * 10) / 10 || 0;
      drawRTLText(`${axisNames[axis]}: ${axisScore}/10`, startX, y, font, 14);
      y -= 20;
    }
  }
  y -= 20;
  
  page.drawLine(startX, y - 5, margin, y - 5, { width: 1, color: rgb(0.8, 0.8, 0.8) });
  y -= 20;
  drawRTLText('التشخيص', startX, y, boldFont, 18, rgb(0.2, 0.4, 0.6));
  y -= 25;
  
  let diagnosis;
  try { diagnosis = JSON.parse(reportData.diagnosis || '{}'); } catch (e) { diagnosis = {}; }
  
  if (diagnosis.overall) {
    drawRTLText(`التشخيص العام: ${diagnosis.overall.riskLevelAr || 'غير متاح'}`, startX, y, font, 14);
    y -= 20;
  }
  
  for (const [axis, data] of Object.entries(diagnosis.axes || {})) {
    if (axisNames[axis] && data.diagnosis) {
      drawRTLText(`${axisNames[axis]}: ${data.diagnosis}`, startX, y, font, 12);
      y -= 20;
    }
  }
  y -= 20;
  
  page.drawLine(startX, y - 5, margin, y - 5, { width: 1, color: rgb(0.8, 0.8, 0.8) });
  y -= 20;
  drawRTLText('قرارات قابلة للتنفيذ', startX, y, boldFont, 18, rgb(0.2, 0.4, 0.6));
  y -= 25;
  
  let actionableDecisions;
  try { actionableDecisions = JSON.parse(reportData.actionableDecisions || '[]'); } catch (e) { actionableDecisions = []; }
  
  actionableDecisions.slice(0, 3).forEach((decision, index) => {
    drawRTLText(`${index + 1}. ${decision.title || 'قرار'} - أولوية: ${decision.priority === 'high' ? 'عالية' : 'متوسطة'}`, startX, y, font, 12);
    y -= 18;
    if (decision.description) {
      drawRTLText(`   ${decision.description}`, startX, y, font, 10, rgb(0.5, 0.5, 0.5));
      y -= 18;
    }
  });
  
  y -= 40;
  page.drawLine(startX, y - 5, margin, y - 5, { width: 1, color: rgb(0.8, 0.8, 0.8) });
  y -= 20;
  drawRTLText('شكراً لاستخدامك منصة ربح', startX, y, font, 12, rgb(0.5, 0.5, 0.5));
  y -= 20;
  drawRTLText(`© ${new Date().getFullYear()} Margin. جميع الحقوق محفوظة.`, startX, y, font, 10, rgb(0.7, 0.7, 0.7));
  
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

module.exports = { generatePDFReport };