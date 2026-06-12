import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const questions = [
  { id: 1, text: 'ما هو معدل نمو إيراداتك السنوي؟', type: 'number', axis: 'revenue' },
  { id: 2, text: 'ما هو هامش الربح الخاص بك؟', type: 'number', axis: 'revenue' },
  { id: 3, text: 'ما نسبة المخزون الراكد لديك؟', type: 'number', axis: 'revenue' },
  { id: 4, text: 'ما نسبة الاحتفاظ بالعملاء لديك؟', type: 'number', axis: 'customers' },
  { id: 5, text: 'ما هو متوسط قيمة المعاملة للعميل؟', type: 'number', axis: 'customers' },
  { id: 6, text: 'كم عدد العملاء النشطين لديك؟', type: 'number', axis: 'customers' },
  { id: 7, text: 'كم عدد المنافسين المباشرين لديك؟', type: 'number', axis: 'competition' },
  { id: 8, text: 'ما هو موقعك التنافسي في السوق؟', type: 'select', axis: 'competition', options: ['رائد السوق', 'منافس قوي', 'متوسط', 'جديد'] },
  { id: 9, text: 'ما هو ميزة تنافسية فريدة لديك؟', type: 'select', axis: 'competition', options: ['منتج فريد', 'سعر تنافسي', 'خدمة مميزة', 'لا يوجد'] },
  { id: 10, text: 'ما مستوى أتمتة عملياتك؟', type: 'select', axis: 'internal', options: ['مؤتمت تماماً', 'مؤتمت جزئياً', 'يدوي'] },
  { id: 11, text: 'ما مستوى كفاءة عملياتك؟', type: 'number', axis: 'internal' },
  { id: 12, text: 'ما تردد تتبع المخزون لديك؟', type: 'select', axis: 'internal', options: ['يومي', 'أسبوعي', 'شهري'] },
  { id: 13, text: 'ما هي قنوات التسويق التي تستخدمها؟ (اختر جميع ما ينطبق)', type: 'multiselect', axis: 'marketing', options: ['وسائل التواصل الاجتماعي', 'الإعلانات المدفوعة', 'البريد الإلكتروني', 'التسويق بالمحتوى', 'الأحداث'] },
  { id: 14, text: 'ما هو نسبة ميزانية التسويق من الإيرادات؟', type: 'number', axis: 'marketing' },
  { id: 15, text: 'ما مستوى وعي العملاء بعلامتك التجارية؟', type: 'select', axis: 'marketing', options: ['عالي جداً', 'عالي', 'متوسط', 'منخفض'] }
];

export default function SurveyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < 12) {
      alert('يرجى الإجابة على جميع الأسئلة');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/reports', {
        title: 'تقرير تشخيصي',
        answers,
        businessName: user.businessName,
        sector: user.sector,
        businessAge: user.businessAge,
        location: user.location
      }, { withCredentials: true });
      router.push(`/report/${res.data.report.id}`);
    } catch (error) {
      alert('حدث خطأ أثناء إنشاء التقرير');
    } finally {
      setLoading(false);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="card">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">الاستبيان التشخيصي</h1>
          <p className="text-gray-600 mb-8">
            إجابة على 15 سؤالًا لتقييم أداء عملك
          </p>
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">
              السؤال {currentQuestion + 1} من {questions.length}
            </p>
            <progress 
              className="w-full h-2 rounded-full" 
              value={(currentQuestion + 1) / questions.length * 100}
              max="100"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentQ.text}
            </h2>
            
            {currentQ.type === 'number' && (
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
              />
            )}
            
            {currentQ.type === 'select' && (
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
              >
                <option value="">اختر إجابة</option>
                {currentQ.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            )}
            
            {currentQ.type === 'multiselect' && (
              <div className="space-y-2">
                {currentQ.options.map((opt, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(answers[currentQ.id] || []).includes(opt)}
                      onChange={(e) => {
                        const current = answers[currentQ.id] || [];
                        if (e.target.checked) {
                          handleAnswer(currentQ.id, [...current, opt]);
                        } else {
                          handleAnswer(currentQ.id, current.filter(o => o !== opt));
                        }
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            {currentQuestion > 0 && (
              <button
                className="btn bg-gray-200 text-gray-700"
                onClick={() => setCurrentQuestion(prev => prev - 1)}
              >
                السابق
              </button>
            )}
            
            {currentQuestion < questions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentQuestion(prev => prev + 1)}
              >
                التالي
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'جاري المعالجة...' : 'إنهاء الاستبيان'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}