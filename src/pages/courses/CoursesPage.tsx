import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Play, 
  FileText, 
  Award, 
  Star, 
  X,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { coursesApi } from '../../services/coursesApi';
import type { Course } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { PageLoader } from '../../components/common/PageLoader';
import { useToast } from '../../context/ToastContext';

export const CoursesPage: React.FC = () => {
  const { toast } = useToast();
  const { openAuthModal, role } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'Payme' | 'Click' | 'Uzum Bank' | 'Visa'>('Click');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    coursesApi.getCourses(selectedCategory === 'all' ? undefined : selectedCategory)
      .then(setCourses)
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const filteredCourses = courses;

  const handleCheckout = async () => {
    if (role === 'guest') {
      openAuthModal('login');
      return;
    }
    if (!activeCourse) return;
    setPaymentSuccess(true);
    try {
      await coursesApi.enrollCourse(activeCourse.id, selectedPayment, promoCode || undefined);
    } catch {}
    setTimeout(() => {
      setPaymentSuccess(false);
      setIsCheckoutOpen(false);
      toast.success('Kursga muvaffaqiyatli a’zo bo‘ldingiz! Dashboard bo‘limida darslarni boshlashingiz mumkin.', 'Xarid Muvaffaqiyatli');
    }, 1500);
  };

  return (
    <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> Barcha Kurslar Interaktiv Katalogi
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Online, Offline hamda Hybrid Ta'lim Kurslari
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          IELTS, Digital SAT, CEFR, IT va Dasturlash bo‘yicha tajribali o‘qituvchilar darslari. Video darslar, PDF o‘quv qo‘llanmalar, AI topshiriqlar hamda Rasmiy Sertifikat.
        </p>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {['all', 'IELTS', 'SAT', 'CEFR', 'General English'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat === 'all' ? 'Barcha Kategoriyalar' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course List Grid */}
      {loading ? (
        <PageLoader fullScreen={false} />
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-semibold">Hozircha kurslar mavjud emas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xl hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-md ${
                    course.type === 'online' ? 'bg-indigo-600 text-white' : course.type === 'offline' ? 'bg-amber-500 text-slate-950' : 'bg-pink-500 text-white'
                  }`}>
                    {course.type}
                  </span>
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-yellow-400 flex items-center gap-1 border border-yellow-500/30 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" /> {course.rating} ({course.reviewsCount})
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                    <span>{course.category}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">{course.duration}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Features badges */}
                  <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                    <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center gap-1">
                      <Play className="w-3 h-3 text-indigo-500 dark:text-indigo-400" /> Video Darslar
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-emerald-500 dark:text-emerald-400" /> PDF Materials
                    </span>
                    {course.hasCertificate && (
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30 flex items-center gap-1 font-bold">
                        <Award className="w-3 h-3 text-indigo-500 dark:text-indigo-400" /> QR Sertifikat
                      </span>
                    )}
                  </div>

                  {/* Teacher Profile */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <img src={course.teacherAvatar} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-700 shadow-sm" />
                    <div>
                      <span className="block text-xs font-bold text-slate-900 dark:text-white">{course.teacherName}</span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400">{course.centerName || 'Eduqash Platform'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-slate-900 dark:text-white">{course.price.toLocaleString()} so‘m</span>
                    {course.originalPrice && (
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 line-through">{course.originalPrice.toLocaleString()} so‘m</span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setActiveCourse(course);
                      setIsCheckoutOpen(true);
                    }}
                    className="py-2.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 active:scale-95 transition-all"
                  >
                    Sotib Olish & Kirish
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Course Detail & Checkout Modal */}
      {isCheckoutOpen && activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900 dark:text-white">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
                {activeCourse.category}
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{activeCourse.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">O‘qituvchi: {activeCourse.teacherName}</p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">To‘lov Tizimini Tanlang (Payme, Click, Uzum, Card)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Payme', 'Click', 'Uzum Bank', 'Visa'] as const).map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => setSelectedPayment(pm)}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      selectedPayment === pm
                        ? 'bg-indigo-600/10 dark:bg-indigo-600/30 border-indigo-500 text-indigo-600 dark:text-indigo-300 shadow-md font-extrabold'
                        : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Code Input */}
            <form className="flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); setDiscountApplied(true); }}>
              <input
                type="text"
                placeholder="Promokod (masalan: EDU2026)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white uppercase focus:outline-none focus:border-indigo-500 font-bold placeholder-slate-400"
              />
              <button
                type="submit"
                className="py-2.5 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold transition-all"
              >
                Qo‘llash
              </button>
            </form>

            {/* Price Summary */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Kurs Narxi:</span>
                <span>{activeCourse.price.toLocaleString()} so‘m</span>
              </div>
              {discountApplied && (
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Promokod Chegirmasi (20%):</span>
                  <span>-{(activeCourse.price * 0.2).toLocaleString()} so‘m</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-900 dark:text-white font-extrabold text-sm pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Jami To‘lov:</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {discountApplied ? (activeCourse.price * 0.8).toLocaleString() : activeCourse.price.toLocaleString()} so‘m
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={paymentSuccess}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {paymentSuccess ? (
                <span className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" /> To‘lov Qabul Qilindi!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Xavfsiz to‘lash ({selectedPayment})
                </span>
              )}
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default CoursesPage;