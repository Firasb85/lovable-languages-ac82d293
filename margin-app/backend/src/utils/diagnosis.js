/**
 * Margin Business Diagnostic Scoring Algorithm
 * 5 axes: Revenue (25%), Customers (20%), Competition (20%), Internal (20%), Marketing (15%)
 */

const SECTOR_AVERAGES = {
  'مواد غذائية وبقالة': { revenueGrowth: 0.25, profitMargin: 0.25, stagnantStock: 0.10, customerRetention: 0.70, avgTransaction: 50000, competitors: 5 },
  'ملابس وأزياء': { revenueGrowth: 0.20, profitMargin: 0.30, stagnantStock: 0.15, customerRetention: 0.65, avgTransaction: 75000, competitors: 8 },
  'إلكترونيات': { revenueGrowth: 0.15, profitMargin: 0.20, stagnantStock: 0.08, customerRetention: 0.75, avgTransaction: 150000, competitors: 10 },
  'أثاث ومنزلي': { revenueGrowth: 0.18, profitMargin: 0.28, stagnantStock: 0.12, customerRetention: 0.68, avgTransaction: 200000, competitors: 6 },
  'صحة وجمال': { revenueGrowth: 0.22, profitMargin: 0.35, stagnantStock: 0.05, customerRetention: 0.72, avgTransaction: 40000, competitors: 7 },
  'خدمات': { revenueGrowth: 0.30, profitMargin: 0.40, stagnantStock: 0.02, customerRetention: 0.80, avgTransaction: 100000, competitors: 4 },
  'بناء وتشييد': { revenueGrowth: 0.12, profitMargin: 0.18, stagnantStock: 0.03, customerRetention: 0.85, avgTransaction: 500000, competitors: 3 },
  'تجارة عامة': { revenueGrowth: 0.16, profitMargin: 0.22, stagnantStock: 0.10, customerRetention: 0.65, avgTransaction: 80000, competitors: 12 }
};

const DEFAULT_WEIGHTS = { revenue: 0.25, customers: 0.20, competition: 0.20, internal: 0.20, marketing: 0.15 };

const QUESTION_AXIS_MAP = {
  1: 'revenue', 2: 'revenue', 3: 'revenue',
  4: 'customers', 5: 'customers', 6: 'customers',
  7: 'competition', 8: 'competition', 9: 'competition',
  10: 'internal', 11: 'internal', 12: 'internal',
  13: 'marketing', 14: 'marketing', 15: 'marketing'
};

async function scoreQuestion(questionId, answer, userData = {}) {
  const sector = userData.sector || 'تجارة عامة';
  const sectorAvg = SECTOR_AVERAGES[sector] || SECTOR_AVERAGES['تجارة عامة'];
  switch (questionId) {
    case 1: return { score: parseFloat(answer) >= 0.5 ? 10 : parseFloat(answer) >= 0.3 ? 8 : parseFloat(answer) >= 0.1 ? 6 : parseFloat(answer) >= -0.1 ? 4 : 2, multiplier: 1.0 };
    case 2: const m = parseFloat(answer); return { score: m >= sectorAvg.profitMargin + 0.1 ? 10 : m >= sectorAvg.profitMargin ? 8 : 6, multiplier: m >= sectorAvg.profitMargin + 0.1 ? 1.2 : 1.0 };
    case 3: const s = parseFloat(answer); return { score: s <= sectorAvg.stagnantStock * 0.5 ? 10 : s <= sectorAvg.stagnantStock ? 8 : 6, multiplier: s <= sectorAvg.stagnantStock * 0.5 ? 1.3 : 1.0 };
    case 4: return { score: parseFloat(answer) >= 0.9 ? 10 : parseFloat(answer) >= 0.8 ? 8 : 6, multiplier: 1.2 };
    case 5: return { score: 10, multiplier: 1.0 };
    case 6: return { score: 10, multiplier: 1.0 };
    case 7: return { score: 10, multiplier: 1.0 };
    case 8: return { score: 10, multiplier: 1.0 };
    case 9: return { score: answer === 'unique_product' ? 10 : answer === 'price' ? 8 : 6, multiplier: answer === 'unique_product' ? 1.3 : 1.0 };
    case 10: return { score: answer === 'automated' ? 10 : answer === 'manual_accurate' ? 8 : 6, multiplier: 1.2 };
    case 11: return { score: parseFloat(answer) >= 0.9 ? 10 : parseFloat(answer) >= 0.8 ? 8 : 6, multiplier: 1.2 };
    case 12: return { score: answer === 'daily_tracking' ? 10 : answer === 'weekly_tracking' ? 8 : 6, multiplier: 1.2 };
    case 13: return { score: Array.isArray(answer) ? Math.min(answer.length * 2.5, 10) : 5, multiplier: 1.2 };
    case 14: return { score: parseFloat(answer) >= 0.15 ? 10 : parseFloat(answer) >= 0.10 ? 8 : 6, multiplier: 1.2 };
    case 15: return { score: answer === 'very_strong' ? 10 : answer === 'strong' ? 8 : 6, multiplier: 1.2 };
    default: return { score: 5, multiplier: 1.0 };
  }
}

async function calculateAxisScores(answers, userData = {}) {
  const axisScores = { revenue: { total: 0, count: 0, score: 0 }, customers: { total: 0, count: 0, score: 0 }, competition: { total: 0, count: 0, score: 0 }, internal: { total: 0, count: 0, score: 0 }, marketing: { total: 0, count: 0, score: 0 } };
  for (const [questionId, answer] of Object.entries(answers)) {
    const qId = parseInt(questionId);
    const axis = QUESTION_AXIS_MAP[qId];
    if (axis) {
      const { score, multiplier } = await scoreQuestion(qId, answer, userData);
      axisScores[axis].total += score * multiplier;
      axisScores[axis].count += 1;
    }
  }
  for (const axis in axisScores) {
    if (axisScores[axis].count > 0) {
      axisScores[axis].score = axisScores[axis].total / axisScores[axis].count;
    } else {
      axisScores[axis].score = 5;
    }
  }
  return { axisScores, adjustedWeights: DEFAULT_WEIGHTS };
}

function calculateOverallScore(axisScores, weights = DEFAULT_WEIGHTS) {
  let total = 0;
  for (const axis in axisScores) {
    total += axisScores[axis].score * weights[axis];
  }
  return Math.round(total * 5);
}

function getRiskLevel(score) {
  if (score >= 35) return 'high';
  if (score >= 22) return 'medium';
  return 'low';
}

function getRiskLevelAr(riskLevel) {
  const levels = { high: 'عالي', medium: 'متوسط', low: 'منخفض' };
  return levels[riskLevel] || riskLevel;
}

function getLevel(score) {
  if (score >= 8) return 'excellent';
  if (score >= 6) return 'good';
  if (score >= 4) return 'average';
  if (score >= 2) return 'below_average';
  return 'poor';
}

function getLevelAr(level) {
  const levels = { excellent: 'ممتاز', good: 'جيد', average: 'متوسط', below_average: 'أقل من المتوسط', poor: 'ضعيف' };
  return levels[level] || level;
}

function getAxisNameAr(axis) {
  const names = { revenue: 'الإيرادات', customers: 'العملاء', competition: 'التنافس', internal: 'العمليات الداخلية', marketing: 'التسويق' };
  return names[axis] || axis;
}

function generateDiagnosticReport(answers, userData = {}) {
  return calculateAxisScores(answers, userData).then(({ axisScores }) => {
    const overallScore = calculateOverallScore(axisScores);
    const riskLevel = getRiskLevel(overallScore);
    const diagnosis = generateDiagnosis(axisScores, overallScore, riskLevel, userData);
    const actionableDecisions = generateActionableDecisions(diagnosis, axisScores, userData);
    const ninetyDayPlan = generate90DayPlan(diagnosis, axisScores, userData);
    const sectorComparison = getSectorComparison(axisScores, userData.sector);
    const wishText = generateWishText(overallScore, riskLevel, userData.sector);
    return { scores: { axisScores, overallScore, riskLevel, riskLevelAr: getRiskLevelAr(riskLevel), adjustedWeights: DEFAULT_WEIGHTS }, diagnosis, actionableDecisions, ninetyDayPlan, sectorComparison, wishText };
  });
}

function generateDiagnosis(axisScores, overallScore, riskLevel, userData = {}) {
  const diagnosis = { overall: { score: overallScore, riskLevel, riskLevelAr: getRiskLevelAr(riskLevel) }, axes: {} };
  for (const axis in axisScores) {
    const score = axisScores[axis].score;
    diagnosis.axes[axis] = {
      score,
      level: getLevel(score),
      diagnosis: getAxisDiagnosis(axis, score),
      recommendations: getAxisRecommendations(axis, score, userData.sector)
    };
  }
  return diagnosis;
}

function getAxisDiagnosis(axis, score, sectorAvg) {
  const level = getLevel(score);
  const diagnoses = {
    revenue: { excellent: 'إيراداتك في وضع ممتاز! معدل نموك و هوامش الربح أعلى من متوسط القطاع.', good: 'إيراداتك جيدة بشكل عام.', average: 'إيراداتك متوسطة مقارنة بقطاعك.', below_average: 'إيراداتك أقل من المتوسط.', poor: 'إيراداتك في وضع حرج.' },
    customers: { excellent: 'قاعدة عملائك قوية جداً!', good: 'قاعدة عملائك جيدة.', average: 'قاعدة عملائك متوسطة.', below_average: 'قاعدة عملائك ضعيفة.', poor: 'قاعدة عملائك في وضع حرج.' },
    competition: { excellent: 'تمتلك ميزة تنافسية قوية!', good: 'وضعك التنافسي جيد.', average: 'التنافس متوسط.', below_average: 'المنافسة قوية.', poor: 'المنافة شديدة.' },
    internal: { excellent: 'عملياتك الداخلية ممتازة!', good: 'عملياتك الداخلية جيدة.', average: 'العمليات الداخلية متوسطة.', below_average: 'العمليات الداخلية ضعيفة.', poor: 'العمليات الداخلية في وضع حرج.' },
    marketing: { excellent: 'استراتيجيتك التسويقية ممتازة!', good: 'التسويق جيد.', average: 'التسويق متوسط.', below_average: 'التسويق ضعيف.', poor: 'التسويق في وضع حرج.' }
  };
  return diagnoses[axis]?.[level] || `حالة ${axis} تحتاج إلى تقييم.`;
}

function getAxisRecommendations(axis, score, sector) {
  const level = getLevel(score);
  const recommendations = {
    revenue: { excellent: ['استمر في استراتيجيتك الحالية.'], good: ['زيادة الهوامش من خلال تحسين التكاليف.'], average: ['مراجعة هيكل التكاليف.'], below_average: ['إعادة هيكلة نموذج التسعير.'], poor: ['البحث عن استشاري مالي.'] },
    customers: { excellent: ['استمر في تقديم الخدمة المميزة.'], good: ['تحسين برنامج الولاء.'], average: ['إطلاق برنامج ولاء.'], below_average: ['تدريب الموظفون على خدمة العملاء.'], poor: ['إعادة بناء علاقة العملاء.'] },
    competition: { excellent: ['استمر في تميزك التنافسي.'], good: ['تحليل المنافسين بشكل دوري.'], average: ['إجراء تحليل SWOT.'], below_average: ['إيجاد ميزة تنافسية فريدة.'], poor: ['البحث عن استشاري استراتيجي.'] },
    internal: { excellent: ['استمر في تحسين العمليات.'], good: ['أتمتة العمليات اليدوية.'], average: ['تنفيذ نظام إدارة المخزون.'], below_average: ['تنفيذ نظام إدارة شامل.'], poor: ['البحث عن استشاري عمليات.'] },
    marketing: { excellent: ['استمر في استراتيجيتك التسويقية.'], good: ['زيادة ميزانية التسويق.'], average: ['إنشاء استراتيجية تسويق شاملة.'], below_average: ['تعيين متخصص في التسويق.'], poor: ['البحث عن وكالة تسويق.'] }
  };
  return recommendations[axis]?.[level] || ['تحسين هذه المنطقة.'];
}

function generateActionableDecisions(diagnosis, axisScores, userData = {}) {
  const sortedAxes = Object.entries(axisScores).map(([axis, data]) => ({ axis, score: data.score })).sort((a, b) => a.score - b.score).slice(0, 3);
  return sortedAxes.map(({ axis, score }) => ({
    axis,
    axisAr: getAxisNameAr(axis),
    priority: 'high',
    title: `تحسين ${getAxisNameAr(axis)}`,
    description: `حالة ${getAxisNameAr(axis)} هي ${getLevelAr(getLevel(score))}.`,
    impact: getLevel(score) === 'poor' ? 'critical' : getLevel(score) === 'below_average' ? 'high' : 'medium',
    effort: getLevel(score) === 'poor' ? 'high' : 'medium',
    timeline: getLevel(score) === 'poor' ? '3-6 أشهر' : getLevel(score) === 'below_average' ? '1-3 أشهر' : '1-2 شهر',
    steps: getAxisRecommendations(axis, score).slice(0, 3)
  }));
}

function generate90DayPlan(diagnosis, axisScores, userData = {}) {
  const overallScore = diagnosis.overall.score;
  const targetScore = Math.min(50, overallScore + 15);
  return {
    title: 'الخطة لمدة 90 يوم',
    description: `الهدف: الوصول إلى درجة ${targetScore} من ${overallScore} حالياً`,
    monthlyGoals: [],
    successMetrics: [`وصول الدرجة الإجمالية إلى ${targetScore} أو أكثر`],
    resourcesNeeded: ['أدوات مجانية', 'دورات تدريبية'],
    estimatedCost: '1,000,000 - 5,000,000 دينار عراقي'
  };
}

function getSectorComparison(axisScores, sector) {
  return {
    sector: sector || 'تجارة عامة',
    sectorAvgScore: 30,
    comparison: Object.values(axisScores).reduce((a, b) => a + b.score, 0) / 5 > 30 ? 'above_average' : 'below_average',
    comparisonAr: Object.values(axisScores).reduce((a, b) => a + b.score, 0) / 5 > 30 ? 'أعلى من متوسط القطاع' : 'أقل من متوسط القطاع'
  };
}

function generateWishText(score, riskLevel, sector) {
  const sectorName = sector || 'عملك';
  if (riskLevel === 'high') return `أهلاً وسهلاً! عملك ${sectorName} في وضع ممتاز.`;
  if (riskLevel === 'medium') return `مرحباً! عملك ${sectorName} في وضع جيد.`;
  return `مرحباً بك! عملك ${sectorName} يحتاج إلى بعض التحسينات.`;
}

module.exports = { SECTOR_AVERAGES, DEFAULT_WEIGHTS, QUESTION_AXIS_MAP, scoreQuestion, calculateAxisScores, calculateOverallScore, getRiskLevel, getRiskLevelAr, generateDiagnosticReport };