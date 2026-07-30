import React, { useState, useEffect } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Send,
  Globe,
  Clock,
  Star,
  Search,
  CheckCircle2,
  Navigation,
  Loader2,
  X
} from 'lucide-react';
import { centersApi } from '../../services/centersApi';
import type { LearningCenter } from '../../types';
import { PageLoader } from '../../components/common/PageLoader';

export const CentersPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [activeCenterModal, setActiveCenterModal] = useState<LearningCenter | null>(null);
  const [centers, setCenters] = useState<LearningCenter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    centersApi.getCenters().then((data) => {
      setCenters(data);
    }).catch(() => {
      setCenters([]);
    }).finally(() => setLoading(false));
  }, []);

  const filteredCenters = centers.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(search.toLowerCase()) ||
      center.description.toLowerCase().includes(search.toLowerCase());
    const matchesCity = selectedCity === 'all' || center.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-4 h-4" /> Respublika O‘quv Markazlari Katalogi
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          O‘quv Markazlari hamda Ularning Filiallari
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          O‘zbekistondagi eng nufuzli tayyorlov markazlarining kontaktlari, manzili, reytingi va ularning barcha kurslari bilan tanishing.
        </p>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Markaz nomi, yo‘nalish yoki kalit so‘zni kiriting..."
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full sm:w-48 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-bold cursor-pointer focus:outline-none focus:border-indigo-500 transition-colors"
          >
            <option value="all">Barcha Shaharlar</option>
            <option value="Toshkent">Toshkent</option>
            <option value="Samarqand">Samarqand</option>
          </select>
        </div>
      </div>

      {/* Centers Directory Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          <span className="ml-3 text-slate-600 dark:text-slate-400 font-semibold">Markazlar yuklanmoqda...</span>
        </div>
      ) : filteredCenters.length === 0 ? (
        <div className="text-center py-20 bg-white/50 dark:bg-slate-900/30 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl">
          <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-semibold">Hozircha o'quv markazlar topilmadi</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <div>
                {/* Cover & Logo */}
                <div className="relative h-48 overflow-hidden">
                  <img src={center.cover} alt={center.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-yellow-400 border border-yellow-500/30 flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" /> {center.rating} ({center.reviewsCount})
                  </div>
                  <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-1 shadow-2xl">
                    <img src={center.logo} alt={center.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 pt-9 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {center.name}
                    </h3>
                    {center.verified && (
                      <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {center.description}
                  </p>

                  {/* Details List */}
                  <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
                      <span className="truncate">{center.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                      <span>Ish vaqti: {center.workingHours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span>{center.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions & Social Links */}
              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-center gap-2">
                  <a href={center.telegram} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-cyan-600 dark:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    <Send className="w-4 h-4" />
                  </a>
                  <a href={center.instagram} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-pink-600 dark:text-pink-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    <Globe className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setActiveCenterModal(center)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 active:scale-95 transition-all text-center"
                  >
                    Xaritada Ko‘rish & Kurslar
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Center Detail Modal with Google Map Mock */}
      {activeCenterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 space-y-6 relative text-slate-900 dark:text-white">
            <button
              onClick={() => setActiveCenterModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img src={activeCenterModal.logo} alt="" className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" />
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{activeCenterModal.name}</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Rasmiy hamkor o‘quv markazi ({activeCenterModal.city})
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeCenterModal.description}
            </p>

            {/* Google Map Mock Box */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-48 bg-slate-100 dark:bg-slate-950 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
              <div className="relative z-10 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-rose-500 text-white mx-auto flex items-center justify-center shadow-lg animate-bounce">
                  <Navigation className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Google Map Joylashuvi</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">{activeCenterModal.address}</div>
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold">GPS: {activeCenterModal.mapCoords.lat}, {activeCenterModal.mapCoords.lng}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t border-slate-200 dark:border-slate-800 pt-4">
              <div className="text-center sm:text-left">
                <span className="text-slate-500 dark:text-slate-400">Ish vaqti:</span>
                <span className="block font-bold text-slate-900 dark:text-white">{activeCenterModal.workingHours}</span>
              </div>
              <a
                href={`tel:${activeCenterModal.phone}`}
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 text-center transition-all"
              >
                Qo‘ng‘iroq qilish ({activeCenterModal.phone})
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CentersPage;