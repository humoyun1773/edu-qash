import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Phone, Mail, MapPin, Send, 
  Globe, ShieldCheck, Zap, ArrowUpRight 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 text-sm pt-16 pb-12 transition-colors relative overflow-hidden">
      
      {/* Background Micro Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          
          {/* Brand Column (2 cols wide on desktop) */}
          <div className="sm:col-span-2 space-y-4 pr-0 lg:pr-8">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Eduqash</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
              O‘zbekistondagi eng yirik o‘quv markazlari, online kurslar, IELTS, Digital SAT hamda CEFR tayyorgarlik platformasi.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a 
                href="https://t.me/eduqash_official" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Telegram"
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-sky-500 hover:bg-sky-500 hover:text-white hover:border-sky-500 shadow-sm transition-all duration-200 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/eduqash_uz" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-pink-500 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-transparent shadow-sm transition-all duration-200 active:scale-95"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-4">Platforma</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/centers" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">O‘quv Markazlar</Link></li>
              <li><Link to="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Barcha Kurslar</Link></li>
              <li><Link to="/ielts" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">IELTS Tayyorgarlik</Link></li>
              <li><Link to="/sat" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Digital SAT Module</Link></li>
              <li><Link to="/cefr" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">CEFR Sertifikat</Link></li>
              <li><Link to="/quizzes" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Online Testlar</Link></li>
            </ul>
          </div>

          {/* Opportunities Column */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-4">Imkoniyatlar</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link to="/ai-assistant" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5 group">
                  <Zap className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform" /> 
                  EduAI Essay Checker
                </Link>
              </li>
              <li><Link to="/leaderboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Talabalar Reytingi</Link></li>
              <li>
                <Link to="/verify/EDUQ-2024-88912" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5 group">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" /> 
                  Sertifikat Tekshirish
                </Link>
              </li>
              <li><Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">O‘qituvchilar Paneli</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Markaz Egalari Paneli</Link></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-4">Bog‘lanish</h4>
            <a href="tel:+998712000000" className="flex items-center gap-2.5 text-xs hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
              <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>+998 (71) 200-00-00</span>
            </a>
            <a href="mailto:support@eduqash.uz" className="flex items-center gap-2.5 text-xs hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
              <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>support@eduqash.uz</span>
            </a>
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">Toshkent shahar, IT Park binosi, 4-qavat</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© 2026 Eduqash LMS Platform Inc. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-6 font-medium">
            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Maxfiylik Siyosati</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Foydalanish Shartlari</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors inline-flex items-center gap-0.5">
              API Docs <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};