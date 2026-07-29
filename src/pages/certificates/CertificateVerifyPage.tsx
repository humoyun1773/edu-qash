import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, Download, CheckCircle2, Search, Loader2, AlertCircle } from 'lucide-react';
import { examsApi } from '../../services/examsApi';
import type { CertificateItem } from '../../types';

export const CertificateVerifyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchId, setSearchId] = useState(id || 'EDUQ-2024-88912');
  const [cert, setCert] = useState<CertificateItem | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCert = (targetId: string) => {
    setLoading(true);
    examsApi.verifyCertificate(targetId)
      .then(res => setCert(res))
      .catch(() => setCert(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (searchId) {
      fetchCert(searchId);
    } else {
      setLoading(false);
    }
  }, [searchId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId) {
      fetchCert(searchId);
    }
  };

  return (
    <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" /> Rasmiy Sertifikatlarni Tekshirish Tizimi
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Sertifikat Haqiqiyligini Tasdiqlash
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Sertifikatdagi QR-kodni skanerlang yoki unikal ID raqamini kiriting.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex items-center gap-2 pt-2">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="EDUQ-2024-88912"
            className="flex-1 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white uppercase focus:outline-none focus:border-indigo-500 font-mono font-bold transition-colors placeholder-slate-400"
          />
          <button 
            type="submit" 
            className="py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-2 shrink-0"
          >
            <Search className="w-4 h-4" /> Tekshirish
          </button>
        </form>
      </div>

      {/* Dynamic Content State */}
      {loading ? (
        <div className="p-12 max-w-5xl mx-auto flex items-center justify-center bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-emerald-500/40 rounded-3xl shadow-xl">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          <span className="ml-3 text-slate-600 dark:text-slate-400 font-semibold">Sertifikat tekshirilmoqda...</span>
        </div>
      ) : !cert ? (
        <div className="p-12 max-w-5xl mx-auto text-center bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-amber-500/40 rounded-3xl shadow-xl space-y-3">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sertifikat Topilmadi</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">ID "{searchId}" bo'yicha hech qanday sertifikat ro'yxatdan o'tmagan.</p>
        </div>
      ) : (
        /* Visual Certificate Card & Verification Badge */
        <div className="p-8 sm:p-12 max-w-5xl w-full mx-auto bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-emerald-500/40 rounded-3xl shadow-2xl relative overflow-hidden space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> RASMIY VERIFIED SERTIFIKAT
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Eduqash Ecosystem Qualification Certificate</h2>
              </div>
            </div>

            <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
              ID: {cert.uniqueId}
            </span>
          </div>

          {/* Certificate Frame Display */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-100 via-white to-indigo-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 border-2 border-amber-500/30 text-center space-y-6 shadow-2xl relative">
            <div className="text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest">CERTIFICATE OF ACHIEVEMENT</div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">{cert.studentName}</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Ushbu sertifikat egasi Eduqash platformasidagi <strong className="text-slate-900 dark:text-white">{cert.courseName}</strong> kursini va imtihonini muvaffaqiyatli yakunlaganligini tasdiqlaydi.
            </p>

            <div className="inline-block p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 font-extrabold text-lg">
              Natija: {cert.gradeOrBand}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              <div className="text-center sm:text-left">
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">Berilgan sana:</span>
                <span className="font-bold text-slate-900 dark:text-white">{cert.issueDate}</span>
              </div>
              {cert.qrCodeUrl && (
                <img src={cert.qrCodeUrl} alt="QR Code" className="w-16 h-16 rounded-xl bg-white p-1 border border-slate-200 dark:border-slate-700 shadow-sm" />
              )}
              <div className="text-center sm:text-right">
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">Tasdiqlovchi:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Eduqash Verified Board</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => alert('Sertifikat PDF formati kompyuteringizga yuklab olindi!')}
              className="py-3.5 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Rasmiy Sertifikatni PDF Shaklida Yuklab Olish
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default CertificateVerifyPage;